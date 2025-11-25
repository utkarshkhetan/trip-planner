/**
 * Firebase Connectivity Test
 * 
 * Run this in browser console: window.testFirebase()
 * 
 * This will test:
 * 1. Firebase initialization
 * 2. Firestore read/write permissions
 * 3. Collection access
 */

import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const testFirebase = async () => {
    console.log('🔥 Starting Firebase connectivity test...\n');

    try {
        // Test 1: Check if Firebase is initialized
        console.log('✓ Firebase app initialized');
        console.log('  Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);

        // Test 2: Try to read from itinerary collection
        console.log('\n📖 Testing READ access to itinerary collection...');
        const itinerarySnapshot = await getDocs(collection(db, 'itinerary'));
        console.log(`✓ Successfully read itinerary collection`);
        console.log(`  Found ${itinerarySnapshot.size} documents`);

        if (itinerarySnapshot.size > 0) {
            const firstDoc = itinerarySnapshot.docs[0];
            console.log('  First document:', {
                id: firstDoc.id,
                data: firstDoc.data()
            });
        }

        // Test 3: Try to write to a test collection
        console.log('\n✍️ Testing WRITE access...');
        const testDocRef = await addDoc(collection(db, '_test_connection'), {
            timestamp: Date.now(),
            message: 'Firebase test write',
        });
        console.log('✓ Successfully wrote to _test_connection');
        console.log('  Document ID:', testDocRef.id);

        // Test 4: Delete the test document
        console.log('\n🗑️ Testing DELETE access...');
        await deleteDoc(doc(db, '_test_connection', testDocRef.id));
        console.log('✓ Successfully deleted test document');

        // Final summary
        console.log('\n✅ ALL TESTS PASSED!');
        console.log('Firebase is properly connected and functioning.');

        return {
            success: true,
            documentsFound: itinerarySnapshot.size,
            message: 'All Firebase operations successful'
        };

    } catch (error: any) {
        console.error('\n❌ FIREBASE TEST FAILED!');
        console.error('Error:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);

        // Provide helpful hints based on error type
        if (error.code === 'permission-denied') {
            console.error('\n💡 HINT: This is a Firestore permission issue.');
            console.error('   You need to update your Firestore security rules.');
            console.error('   Go to Firebase Console → Firestore Database → Rules');
            console.error('   For development, you can use:');
            console.error(`
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;  // WARNING: Only for development!
       }
     }
   }`);
        }

        return {
            success: false,
            error: error.message,
            errorCode: error.code
        };
    }
};

// Make it available globally
if (typeof window !== 'undefined') {
    (window as any).testFirebase = testFirebase;
}

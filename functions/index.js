const functions = require("firebase-functions");
const { onDocumentCreated, onDocumentWritten } = require("firebase-functions/v2/firestore");

const {initializeApp} = require("firebase-admin/app")
const {getFirestore,FieldValue} = require("firebase-admin/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");

const app = initializeApp();
const db = getFirestore()
  
let ssrServerServer;
exports.ssrServer = functions.region("us-central1").https.onRequest(async (request, response) => {      
  if (!ssrServerServer) {
    functions.logger.info("Initialising SvelteKit SSR entry");
    ssrServerServer = require("./ssrServer/index").default;
    functions.logger.info("SvelteKit SSR entry initialised!");
  }
  functions.logger.info("Requested resource: " + request.originalUrl);
  return ssrServerServer(request, response);
});

exports.updateRentalHealthCheckInfo = onDocumentWritten("RentalHealthChecks/{docId}", async (event)=>{

  const document = event.data.after;
  const data = document.data();

  const gender = data.gender;

  if( document.id == "Info"){
    return;
  }

  if(!document.exists){
    db.doc("RenatlHealthChecks/Info").set({count: FieldValue.increment(-1)},{merge:true})

    return;
  }
 const infoSnapshot = await db.doc('RentalHealthChecks/Info').get();


  await db.doc("RentalHealthChecks/Info").set({count: FieldValue.increment(1), emergent: data.emergency == "Yes"? FieldValue.increment(1): FieldValue.increment(0), gender: {...infoSnapshot.data().gender, [gender] : FieldValue.increment(1)}}, {merge:true})
  await db.doc("Tests/HealtCheck").set({count : FieldValue.increment(1)}, {merge:true})
  return;

})

exports.rentalHealthScheduled = onSchedule("every day 00:00", async (event)=>{
  
  const healthCheckCount  = await db.collection('RentalHealthCheks').count().get();

  const healthCheckInfo = await db.doc('RentalHealthChecks/Info').get();

  const newHealthCheckCount = healthCheckCount - healthCheckInfo.data().previousDayCount || 0;

  await db.doc('RentalHealthChecks/Info').set({previousDayCount: newHealthCheckCount, healthChecksOverTime: [...(healthCheckInfo.data().healthChecksOverTime || []), {count: newHealthCheckCount, date: FieldValue.serverTimestamp()}]}, {merge:true})

  return;
})
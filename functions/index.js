const functions = require("firebase-functions");
const { onDocumentCreated, onDocumentWritten } = require("firebase-functions/v2/firestore");

const {initializeApp} = require("firebase-admin/app")
const {getFirestore,FieldValue, Timestamp} = require("firebase-admin/firestore");
const {getAuth} = require("firebase-admin/auth")
const { onSchedule } = require("firebase-functions/v2/scheduler");

const app = initializeApp();
const db = getFirestore()
const auth = getAuth();
  
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

// exports.updateRentalHealthCheckInfo = onDocumentWritten("RentalHealthChecks/{docId}", async (event)=>{

//   const document = event.data.after;
//   const data = document.data();

//   if( document.id == "Info"){
//     return;
//   }

//   if(!document.exists){
//     db.doc("RenatlHealthChecks/Info").set({count: FieldValue.increment(-1)},{merge:true})

//     return;
//   }

//   const gender = data.gender;

//  const infoSnapshot = await db.doc('RentalHealthChecks/Info').get();


//   await db.doc("RentalHealthChecks/Info").set({count: FieldValue.increment(1), emergent: data.emergency == "Yes"? FieldValue.increment(1): FieldValue.increment(0), gender: {...infoSnapshot.data().gender, [gender] : FieldValue.increment(1)}}, {merge:true})

//   const ownerUserAuth = await auth.getUser(data.owner);

//   const ownerUserDoc = (await db.collection("Users").doc(data.owner).get());
//   const ownerUserData = ownerUserDoc.data();

//   const res =  await document.ref.set({owner:{id: ownerUserDoc.id,firstName: ownerUserData?.firstName || "", lastName : ownerUserData?.lastName || "", email : ownerUserAuth.email || ""}}, {merge:true});
//   functions.logger.log(res)
//   functions.logger.log("Updated rental health")
//   return res

// })

exports.rentalHealthScheduled = onSchedule("every day 00:00", async (event)=>{
  
  try{
  const lastHealthCheckOverTimeDoc  = (await db.collection('HealthChecksOverTime').orderBy("date", "desc").limit(1).get()).docs[0];

  const healthCheckCount = await db.collection('RentalHealthChecks').count().get();

  const newHealthCheckCount = healthCheckCount.data().count - lastHealthCheckOverTimeDoc.data().count || 0;

  functions.logger.log("count:")
  functions.logger.log(newHealthCheckCount);



  await db.collection('HealthChecksOverTime').add({count: Math.max(newHealthCheckCount, 0), date: Timestamp.now()})

  functions.logger.log("No Errors")
  }
  catch(err){
    functions.logger.log("Caught Error")
    functions.logger.error(err);
  }


  return;
})
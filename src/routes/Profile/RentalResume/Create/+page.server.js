import * as adminFirestore from "firebase-admin/firestore"
const {getFirestore, FieldValue} = adminFirestore;
/**@type {import("../$types").Actions} */
export const actions = {
    Upload : async ({locals,request, cookies})=>{

        const sessionCookie = cookies.get("__session")
        const data = await request.formData()

        const {user, app} = await locals.GetUserFromSession(sessionCookie || "");

        //TODO: Handle this
        if(!user){
            return;
        }

        const userEmail = /**@type {string} */ (data.get("userEmail"));
        const userAddress = /**@type {string} */ (data.get("userAddress"));
        const userPhone = /**@type {string} */ (data.get("userPhone"));
        const objectiveStatement = /**@type {string} */ (data.get("objective"));
        const backgroundStatement = /**@type {string} */ (data.get("background"));
        const userIncome = /**@type {string} */ (data.get("income"));

        const workHistoryTitles = /**@type {Array<string>} */ (data.getAll("workHistoryTitle"));
        const workHistoryStartDates = /**@type {Array<string>} */ (data.getAll("workHistoryStartDate"));
        const workHistoryEmployers = /**@type {Array<string>} */ (data.getAll("workHistoryEmployer"));
        const workHistoryEndDates = /**@type {Array<string>} */ (data.getAll("workHistoryEndDate"));
        const workHistoryContactNames = /**@type {Array<string>} */ (data.getAll("workHistoryContactName"));
        const workHistoryContactPhones = /**@type {Array<string>} */ (data.getAll("workHistoryContactPhone"));
        const workHistoryContactTitles = /**@type {Array<string>} */ (data.getAll("workHistoryContactTitle"));

        const rentalHistoryAddresses = /**@type {Array<string>} */ (data.getAll("rentalHistoryAddress"));
        const rentalHistoryRents = /**@type {Array<string>} */ (data.getAll("rentalHistoryRent"));
        const rentalHistoryStartDates = /**@type {Array<string>} */ (data.getAll("rentalHistoryStartDate"));
        const rentalHistoryEndDates = /**@type {Array<string>} */ (data.getAll("rentalHistoryEndDate"));
        const rentalHistoryContactNames = /**@type {Array<string>} */ (data.getAll("rentalHistoryContactName"));
        const rentalHistoryContactTitles = /**@type {Array<string>} */ (data.getAll("rentalHistoryContactTitle"));
        const rentalHistoryContactPhones = /**@type {Array<string>} */ (data.getAll("rentalHistoryContactPhone"));
        const rentalHistoryReasonsForLeaving = /**@type {Array<string>} */ (data.getAll("rentalHistoryReasonForLeaving"));

        const extraReferenceNames = /**@type {Array<string>} */ (data.getAll("extraReferenceName"));
        const extraReferenceTitles = /**@type {Array<string>} */ (data.getAll("extraReferenceTitle"));
        const extraReferenceRelationships = /**@type {Array<string>} */ (data.getAll("extraReferenceRelationship"));
        const extraReferncePhones = /**@type {Array<string>} */ (data.getAll("extraReferencePhone"))

        const extraInfo = /**@type {string} */ (data.get("extraInfo"));

        /**@type {Array<{employer : string, title: string, startDate : Date, endDate: Date, contact : import("$lib/Interfaces/databaseTypes").ContactInfo}>} */
        let workHistory = [];

        for (let i = 0; i < workHistoryTitles.length; i++) {
            workHistory.push({
            employer: workHistoryEmployers[i],
            title: workHistoryTitles[i],
            startDate: new Date(workHistoryStartDates[i]),
            endDate : new Date(workHistoryEndDates[i]),
            contact : {name: workHistoryContactNames[i], phone: workHistoryContactPhones[i], title: workHistoryContactTitles[i]}
            })
            
        }

        /**@type {Array<{address: string, rent : number, startDate : Date, endDate : Date, contact:import("$lib/Interfaces/databaseTypes").ContactInfo, reasonForLeaving : string}>} */
        let rentalHistory = [];
        for (let i = 0; i < rentalHistoryAddresses.length; i++) {
            rentalHistory.push({
                address: rentalHistoryAddresses[i],
                rent: parseInt(rentalHistoryRents[i]),
                startDate: new Date(rentalHistoryStartDates[i]),
                endDate: new Date(rentalHistoryEndDates[i]),
                contact: {name: rentalHistoryContactNames[i], title: rentalHistoryContactTitles[i], phone: rentalHistoryContactPhones[i]},
                reasonForLeaving: rentalHistoryReasonsForLeaving[i],
            })
            
        }
        /**@type {Array<import("$lib/Interfaces/databaseTypes").ContactInfo>} */
        let extraRefences = []

        for (let i = 0; i  < extraReferenceNames.length; i++) {
            extraRefences.push({
                name: extraReferenceNames[i], 
                phone: extraReferncePhones[i],
                title: extraReferenceTitles[i],
                relationship: extraReferenceRelationships[i]
            })
            
        }

       /**@type {import("$lib/Interfaces/databaseTypes").RentalResume} */
        let dataPayload = {
            author: user.uid,
            userAddress : userAddress,
            userEmail : userEmail,
            userPhone : userPhone,
            userIncome : parseInt(userIncome),
            objectiveStatement : objectiveStatement,
            backgroundStatement : backgroundStatement,
            rentalHistory : rentalHistory,
            workHistory : workHistory,
            extraReferences: extraRefences,
            extraInfo : extraInfo || "",
            timestamp : FieldValue.serverTimestamp()

        };

        const firestore = getFirestore(app);


        const docSnapshot = await firestore.collection("RentalResumes").add({ ...dataPayload})



    }
}
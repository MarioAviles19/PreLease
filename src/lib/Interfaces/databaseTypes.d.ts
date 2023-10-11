import type { FieldValue } from "firebase-admin/firestore";

export interface LandlordReview{
    /**The `id` of the review document */
    id:string;

    /**The comment made by the reviewer*/
    comment:string;

    /**Overall rating of the property */
    overallRating:number;
    /**The rating of the managament of the property */
    managementRating:number;
    /**The rating of the responsiveness of the property */
    responsivenessRating:number;
    /**The `uid` of the user who made the review, should be made `null` on the font-end */
    author:string;

    /**Tenency start date*/
    startDate:Date;
    /**Tenency end date */
    endDate:Date;
    /**The timestamp on the document */
    timestamp:Date;
    /**The average monthly rent */
    rent?:number;

}
export interface ContactInfo{
    name: string;
    email?: string;
    title?: string;
    relationship?:string;
    phone: string;

}
export interface FirebaseDate extends Date{
    _nanoseconds: number,
    _seconds: number
}

export interface PropertyInfo{
    id?:string
    address: string;
    overallRating: number;
    managementRating: number;
    responsivenessRating: number;
    reviewCount: number;

}
export interface RentalResume{
    /**The `id` of the document */
    id?:string;

    /**The `uid` of the user who create the resume*/
    author:string;

    /**The `Objective` section of the resume */
    objectiveStatement:string;
    /**The `Background` section of the  resume*/
    backgroundStatement:string;

    /**User's Address */
    userAddress:string;
    /**User's Email */
    userEmail:string;
    /**User's Phone Number */
    userPhone:string;

    /**User's annual income */
    userIncome:number

    /**Array containing rental history objects */
    rentalHistory : Array<{address : string, rent: number, startDate: Date, endDate : Date , reasonForLeaving: string}>;

    /**Array containing work history objects*/
    workHistory : Array<{employer:string, title:string, startDate:Date , endDate:Date , contact: ContactInfo}>;

    /**Array containing the extra reference contact info */
    extraReferences : Array<ContactInfo>;

    timestamp : Date | FieldValue

    /**Extra info to be included in the document by the user */
    extraInfo?: string;

}
export interface UserInfo{
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    organization : string;
    role : "member" | "Moderator" | "Admin"

}

export interface RentalHealthCheckDB{
    timestamp : FirebaseDate

    buildingType : string;

    caseManager : "Yes" | "No";

    cosigners : "Yes" | "No";

    gender : "man" | "woman" | "non-binary";

    creditRating : string;

    creditRefundFiled : "Yes" | "No";

    currentLease : string;

    currentTenant : "Yes" | "No";

    demographics : Array<string>;

    emergency : "Yes" | "No";

    evicted : "Yes" | "No";

    followUp : "Yes" | "No";

    income : number;

    city : string;

    landlordRelationShip : string;

    liveInLandlord : "Yes" | "No";

    minorsInHouse : "Yes" | "No";

    moreInfo : Array<string>;

    negativeRelationship : "Yes" | "No";

    owner : string;

    paymentType : string;

    planningToMove : "Yes" | "No";

    pregnancy : "Yes" | "No";

    race : Array<string>;

    transit : string;

    organization : string;

    utilityStruggle : "Yes" | "No";
}
export interface RentalHealthCheckClient{


    id? : string;

    timestamp : Date

    buildingType : string;

    caseManager : "Yes" | "No";

    cosigners : "Yes" | "No";

    creditRating : string;

    creditRefundFiled : "Yes" | "No";

    currentLease : string;

    currentTenant : "Yes" | "No";

    demographics : Array<string>;

    emergency : "Yes" | "No";

    evicted : "Yes" | "No";

    followUp : "Yes" | "No";
    /**Todo: Change this from an array to string in the server*/
    gender : string;

    income : number;

    city : string;

    organization : string;

    landlordRelationShip : string;

    liveInLandlord : "Yes" | "No";

    minorsInHouse : "Yes" | "No";

    moreInfo : Array<string>;

    negativeRelationship : "Yes" | "No";

    owner : {firstName : string, lastName : string, id : string, email : string};

    paymentType : string;

    planningToMove : "Yes" | "No";

    pregnancy : "Yes" | "No";

    race : Array<string>;

    transit : string;

    utilityStruggle : "Yes" | "No";
}

export interface RentalHealthCheckInfoDB{
    emergent : number;

    city : Array<{name : string, count : number}>;

    healthChecksOverTime : Array<{count: number, date : FirebaseTimestamp}>


    gender : string;

    count : number;
}

export interface RentalHealthCheckInfoClient{
    emergent : number;

    city : Array<{name : string, count : number}>;

    healthChecksOverTime : Array<{count: number, date :  Date}>

    gender : string;

    count : number;
}
export interface FirebaseTimestamp{
    _seconds : number;

    _nanoseconds : number;
}

export interface OrgRequestDB{
    id : string;

    timestamp : FirebaseDate;

    member : string;

    organization : string;

    type : "addUser";

    status? : "pending" | "accepted" | "rejected";
}

export interface OrgRequestClient{
    id : string;

    timestamp : Date;

    member : UserInfo;

    organization : string;

    type : "addUser";

    status? : "pending" | "accepted" | "rejected";
}

export interface Organization{
    id : string;
    name : string;
    iconRef : string;
    icon : string;
    acceptedDomains? : Array<strings>;
    rejectExternalDomains? : boolean;
}

export interface Resource{
    id: string;
    organization : string;
    name : string;
    description : string;
    link : string;
    phoneNumber? : number;

    eligable? : boolean;

    requirements : ResourceRequirmentList;




}
export interface ResourceRequirmentList{

    [key : string] : string | Array<string> | boolean;

    income? : string;

    gpa? : string;

    gender? : Array<"man" | "woman" | "nonBinary">;

    houseHoldSize? : string;

    creditRating? : "poor" | "good" | "excellent";

    criminalBackground? : boolean;

    minorsInHouse? : boolean;

    demographics? : Array<string>;
}

abstract interface TokenDoc {
    used: boolean;
    timestamp : FirebaseTimestamp;
}

export interface ResetPasswordToken extends TokenDoc{
    email: string;
}
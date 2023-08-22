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

    /**Array containing rental history objects */
    rentalHistory : Array<{address : string, rent: number, startDate: Date, endDate : Date, reasonForLeaving: string}>;

    /**Array containing work history objects*/
    workHistory : Array<{employer:string, title:string, startDate:Date, endDate:Date, contact: ContactInfo}>;

    /**Array containing the extra reference contact info */
    extraReferences : Array<ContactInfo>;

    timestamp : Date

    /**Extra info to be included in the document by the user */
    extraInfo?: string;

}
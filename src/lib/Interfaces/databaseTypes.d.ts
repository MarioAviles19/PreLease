export interface LandlordReview{
    /**The `id` of the review document */
    id:string;

    /**The comment made by the reviewer*/
    comment:string;

    
    overallRating:number;
    managementRating:number;
    responsivenessRating:number;
    /**The `uid` of the user who made the review, should be made `null` on the font-end */
    author:string;

    startDate:Date;
    endDate:Date;
    timestamp:Date;

}
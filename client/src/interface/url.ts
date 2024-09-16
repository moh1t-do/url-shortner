export interface IUrldata {
    _id: string,
    urlTitle: string,
    shortId: string,
    redirectUrl: string,
    visitHistory: number[],
    createdBy: string,
    createdAt: Date,
    updatedAt: Date
}
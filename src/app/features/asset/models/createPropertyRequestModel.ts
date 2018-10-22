export class CreateAssetPropertyRequest {
    propertyReference: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    postcode: string;
    knownAs: string;
    propertySize: number | null;
    netInternalSize: number | null;
    grossInternalSize: number | null;
    numberOfFloors: number | null;
    numberOfPlantRooms: number | null;
    statusStartDate: Date | string | null;
    countyId: number | null;
    countryId: number | null;
    assetId: number;
    id: number;
    dataId: string;

    constructor(data?) {
        data = data || {};
        this.propertyReference = data.propertyReference;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.addressLine3 = data.addressLine3
        this.city = data.city;
        this.countryId = data.countryId;
        this.countyId = data.countyId;
        this.statusStartDate = data.statusStartDate;
        this.netInternalSize =data.netInternalSize;
        this.grossInternalSize = data.grossInternalSize;
        this.numberOfFloors = data.numberOfFloors;
        this.numberOfPlantRooms = data.numberOfPlantRooms;
        this.id = data.id | data.recordId;
        this.assetId = data.assetId | data.savedEntityId;
        this.dataId = data.dataId == undefined ? data.savedDataId : data.dataId ;
        this.postcode = data.postcode;
        this.knownAs = data.knownAs;
    }
}
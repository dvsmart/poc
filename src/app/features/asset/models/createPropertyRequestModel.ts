export class CreateAssetPropertyRequest {
    PropertyReference: string;
    AddressLine1: string;
    AddressLine2: string;
    AddressLine3: string;
    City: string;
    Postcode: string;
    KnownAs: string;
    PropertySize: number | null;
    NetInternalSize: number | null;
    GrossInternalSize: number | null;
    NumberOfFloors: number | null;
    NumberOfPlantRooms: number | null;
    StatusStartDate: Date | string | null;
    CountyId: number | null;
    CountryId: number | null;
    AssetId: number;
    id: number;
    /**
     *
     */
    constructor(CreateAssetPropertyRequest) {
        this.AddressLine1=  CreateAssetPropertyRequest.AddressLine1;
    }

}
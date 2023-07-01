export interface DataType {
  products: [
    {
      title: string;
      price: number;
    }
  ];
}

////////////////////////// Banner type ///////////////////////////
export interface BannerType {
  _updatedAt: string;
  largeText1: string;
  desc: string;
  buttonText: string;
  image: [Image];
  _createdAt: string;
  _rev: string;
  _type: string;
  _id: string;
}

interface Image {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}

////////////////////////////// Product type //////////////////////////////////

export interface ProductType {
  _rev: string;
  details?: string;
  _createdAt: string;
  price?: number;
  _type: string;
  name: string;
  _id: string;
  _updatedAt: string;
  slug?: Slug;
  image?: Image[];
}

interface Image {
  _type: string;
  _key: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}

interface Slug {
  current: string;
  _type: string;
}

///// guest cart item type //////
export interface GuestCartItemType {
  name: string;
  qty: number;
  image: string;
  price: number;
}

////////// banner type //////////
export interface CollectionBanner {
  largeText2: string;
  largeText1: string;
  _rev: string;
  name: string;
  _updatedAt: string;
  image: [Image];
  _createdAt: string;
  _type: string;
  discount: string;
  _id: string;
}

interface Image {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}

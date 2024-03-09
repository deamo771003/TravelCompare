export interface getIndexData {
  id: number
  name: string
  startDate: string
  endDate: string
  cost: number
  details: string
  image: string
  formed: boolean,
  originName: string
  countryName: string
  agencyName: string
  favoriteCount: number
}

export interface getIndexDataSuccessRes {
  status: string
  user: getIndexData[]
}
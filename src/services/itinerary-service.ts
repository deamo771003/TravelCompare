import { Request } from 'express'
import { CallbackError } from '../interfaces/error-interface'
import { Itinerary, sequelize } from '../db/models'
import { GetIndexData, GetIndexDataSuccessRes } from '../interfaces/itinerary-interface'

const itineraryService = {
  //! HTTP 請求回傳的資料通常會用 cb ，所以箭頭函式沒有 return 任何值，故給函數返回類型是 void
  getIndexData: (req: Request, cb: (err?: CallbackError | null, data?: GetIndexDataSuccessRes) => void) => {
    // 抓出前 10 名最多人加入 Favorite 的 Itinerary
    // 取出 Itinerary 表 include model Favorite.count
    const query = `
      SELECT TOP 10 
      I.id,
      I.name,
      I.startDate,
      I.endDate,
      I.cost,
      I.details,
      I.image,
      I.formed,
      O.name AS originName,
      C.name AS countryName,
      A.name AS agencyName,
      (
        SELECT COUNT(*)
        FROM Favorites AS F
        WHERE F.itineraryId = I.id
      ) AS favoriteCount
      FROM Itineraries AS I
      LEFT JOIN Origins AS O ON I.originId = O.id
      LEFT JOIN Countries AS C ON I.countryId = C.id
      LEFT JOIN Agencies AS A ON I.agencyId = A.id
      ORDER BY FavoriteCount DESC;
    `
    sequelize.query(query, { model: Itinerary, mapToModel: true })
      //! TS 無法判別 db query 出的資料型別有哪些只能使用 any，在 cb 再行定義
      .then((itineraries: any) => {
          cb(null, {
          status: 'success',
          user: itineraries as GetIndexData[]
        })
      })
      .catch(err => {
          cb(err)
      })
  }
}

export default itineraryService
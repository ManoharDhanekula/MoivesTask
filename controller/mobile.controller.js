import mobileService from "../service/mobile.service.js";

async function getAllMobileData(request, response) {
  const mobileData = mobileService.displayingData();
  response.send(await mobileData);
}

async function postDataByID(request, response) {
  console.log(request.body);

  const { brand, title, url, rating, image, os, ram, price } = request.body;
  const mobileDataPost = mobileService.postingData(
    brand,
    title,
    url,
    rating,
    image,
    os,
    ram,
    price
  );
  const not_Found = { msg: "Not Inserted" };
  mobileDataPost
    ? response.send(await mobileDataPost)
    : response.status(404).send(not_Found);
}

async function paginationForMobilesData(req, res) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const { count, rows } = await mobileService.paginationForMobile(page, limit);

  const totalPages = Math.ceil(count / limit);

  res.send({
    currentPage: page,
    totalPages: totalPages,
    totalCount: count,
    data: rows,
  });
}

async function getMobileDataByID(request, response) {
  const not_Found = { msg: "Mobile Not Found" };
  const { id } = request.params;

  const mobileData = mobileService.findByID(id);
  mobileData
    ? response.send(await mobileData)
    : response.status(404).send(not_Found);
}

async function putMobileDataByID(request, response) {
  console.log(request.body);
  const { id } = request.params;

  const { brand, title, url, rating, image, os, ram, price } = request.body;
  const mobileDataUpdate = mobileService.updatingMobileDataByID(
    brand,
    title,
    url,
    rating,
    image,
    os,
    ram,
    price,
    id
  );
  const not_Found = { msg: "Not Updated" };
  mobileDataUpdate
    ? response.send(await mobileDataUpdate)
    : response.status(404).send(not_Found);
}

async function deleteMobileDataByID(request, response) {
  const { id } = request.params;
  const mobileDataDelete = mobileService.distoryMobileDataByID(id);
  console.log(mobileDataDelete);
  const not_Found = { msg: "Not found" };
  mobileDataDelete
    ? response.send("Deleted")
    : response.status(404).send(not_Found);
}

export default {
  getAllMobileData,
  postDataByID,
  paginationForMobilesData,
  getMobileDataByID,
  putMobileDataByID,
  deleteMobileDataByID,
};

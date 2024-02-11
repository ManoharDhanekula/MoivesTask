import mobileService from "../service/mobile.service.js";

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

async function paginationForMobilesData(request, response) {
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit) || 10;

  if (page) {
    const { count, rows } = await mobileService.paginationForMobile(
      page,
      limit
    );
    const totalPages = Math.ceil(count / limit);

    response.send({
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
      data: rows,
    });
  } else {
    const mobileData = mobileService.displayingData();
    response.send(await mobileData);
  }
}

async function getMobileDataByID(request, response) {
  const not_Found = { msg: "Not Found" };
  const { id } = request.params;
  if (!isNaN(id)) {
    const mobileData = mobileService.findByID(id);
    mobileData
      ? response.send(await mobileData)
      : response.status(404).send(not_Found);
  } else {
    const mobileData = mobileService.findByBrand(id);
    mobileData
      ? response.send(await mobileData)
      : response.status(404).send(not_Found);
  }
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
  postDataByID,
  paginationForMobilesData,
  getMobileDataByID,
  putMobileDataByID,
  deleteMobileDataByID,
};

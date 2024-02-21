import { Mobile } from "../model/mobile.model.js";
import mobileService from "../service/mobile.service.js";
import usersService from "../service/users.service.js";
import { Op } from "sequelize";
async function postDataByID(request, response) {
  console.log(request.body);
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (
    findingUserRoleID.dataValues.role_id == 3 ||
    findingUserRoleID.dataValues.role_id == 1
  ) {
    try {
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
    } catch (err) {
      response.send({ msg: err });
    }
  } else {
    response.send("NoT Authorization");
  }
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

async function sortByItems(req, res) {
  try {
    const order = req.query.order || "DESC";
    const sortedData = await Mobile.findAll({
      order: [["rating", order.toUpperCase()]],
    });

    res.send(sortedData);
  } catch (error) {
    console.error("Error fetching sorted data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function priceByItems(req, res) {
  try {
    const order = req.query.order || "DESC";
    const sortedData = await Mobile.findAll({
      order: [["price", order.toUpperCase()]],
    });

    res.send(sortedData);
  } catch (error) {
    console.error("Error fetching sorted data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function ramByItems(req, res) {
  try {
    const searchTerm = req.query.q; // Get the search term from the query parameters

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const searchData = await Mobile.findAll({
      where: {
        [Op.or]: [
          { brand: { [Op.like]: `%${searchTerm}%` } },
          { title: { [Op.like]: `%${searchTerm}%` } },
          { os: { [Op.like]: `%${searchTerm}%` } },
          { ram: searchTerm },
          { rating: searchTerm },
        ],
      },
    });

    res.send(searchData);
  } catch (error) {
    console.error("Error searching data:", error);
    res.status(500).json({ error: "Internal server error" });
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
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (
    findingUserRoleID.dataValues.role_id == 3 ||
    findingUserRoleID.dataValues.role_id == 1
  ) {
    try {
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
    } catch (err) {
      response.send({ msg: err });
    }
  } else {
    response.send("NoT Authorization");
  }
}

async function deleteMobileDataByID(request, response) {
  const { id } = request.params;
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (findingUserRoleID.dataValues.role_id == 3) {
    try {
      const mobileDataDelete = mobileService.distoryMobileDataByID(id);
      console.log(mobileDataDelete);
      const not_Found = { msg: "Not found" };
      mobileDataDelete
        ? response.send("Deleted")
        : response.status(404).send(not_Found);
    } catch (err) {
      response.send({ msg: err });
    }
  } else {
    response.send("NoT Authorization");
  }
}

export default {
  postDataByID,
  paginationForMobilesData,
  sortByItems,
  priceByItems,
  ramByItems,
  getMobileDataByID,
  putMobileDataByID,
  deleteMobileDataByID,
};

const express = require("express");
const createError = require("../utils/error");
const monthlyRentSchema = require("../model/monthlyRentSchema");

const addRent = async (req, res, next) => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const currentMonth = `${month}-${year}`;
  console.log(currentMonth);

  try {
    //check if rent alredy present fro this month
    const rentExisted = await monthlyRentSchema.findOne({
      userId: req.user.id,
      month: currentMonth,
    });
    if (rentExisted) {
      return res.json({ message: "rent already present" });
    } else {
      const addRent = await monthlyRentSchema.create({
        userId: req.user.id,
        userName: req.user.userName,
        month: currentMonth,
        rent: req.user.rent,
      });
      res.status(200).json({
        success: true,
        message: "Monthly rent add successfully",
        addRent,
      });
    }
  } catch (error) {
    next(error);
  }
};
//update status like paid or unpaid
const updateStatus = async (req, res, next) => {
  const { rentId } = req.params;
  const { paid } = req.body;
  try {
    const updateStatus = await monthlyRentSchema.findByIdAndUpdate(
      rentId,
      { paid },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Rent status Updated successfully",
        updateStatus,
      });
  } catch (error) {
    next(error);
  }
};
//fetch all monthly rent
const fetchAllMonthlyRent = async (req, res, next) => {
  try {
    const fetchAllRentByUser = await monthlyRentSchema.find({
      userId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "Ferching all monthly rent by loged in user",
      fetchAllRentByUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addRent, fetchAllMonthlyRent, updateStatus };

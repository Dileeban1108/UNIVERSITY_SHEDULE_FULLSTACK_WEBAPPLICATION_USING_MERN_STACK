const Lecturer = require("../models/Lecturer");
const StudentWelfare = require("../models/StudentWelfare");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const checkDuplicateEmail = async (email) => {
  const lecturerCheck = Lecturer.findOne({ email: email }).exec();
  const userCheck = User.findOne({ email: email }).exec();
  const studentWelfareCheck = StudentWelfare.findOne({ email: email }).exec();

  const [lecturer, user, studentWelfare] = await Promise.all([
    lecturerCheck,
    userCheck,
    studentWelfareCheck,
  ]);

  return lecturer || user || studentWelfare;
};

const handleNewUser = async (req, res) => {
  const {
    username,
    studentnumber,
    email,
    password,
    phone,
    faculty,
    department,
  } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Email, username, and password are required" });
  }

  const duplicateUser = await checkDuplicateEmail(email);

  if (duplicateUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  try {
    const hashedPWD = await bcrypt.hash(password, 10);

    // Remove slashes from studentnumber
    const cleanedStudentnumber = studentnumber.replace(/\//g, "");

    const newUser = await User.create({
      username: username,
      studentnumber: cleanedStudentnumber,
      email: email,
      password: hashedPWD,
      phone: phone,
      department: department,
      faculty: faculty,
    });

    console.log(newUser);

    res
      .status(200)
      .json({ success: `New user with username ${username} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const handleNewLecturer = async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    position,
    university,
    department,
    faculty,
  } = req.body;
  if (!username || !password || !email || !university)
    return res
      .status(400)
      .json({
        message: "email, lecturename,university  and password is required",
      });

  const duplicateUser = await checkDuplicateEmail(email);

  if (duplicateUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  try {
    const hashedPWD = await bcrypt.hash(password, 10);

    const newLecturer = await Lecturer.create({
      username: username,
      email: email,
      password: hashedPWD,
      phone: phone,
      address: address,
      university: university,
      department: department,
      faculty: faculty,
      position: position,
    });

    res.status(200).json({ success: `new lecturer with ${username} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const handleNewStudentWelfare = async (req, res) => {
  const { username, email, password, phone, address, position, university } =
    req.body;
  if (!username || !password || !email || !university)
    return res
      .status(400)
      .json({
        message: "email, lecturename,university  and password is required",
      });

  const duplicateUser = await checkDuplicateEmail(email);

  if (duplicateUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  try {
    const hashedPWD = await bcrypt.hash(password, 10);

    await StudentWelfare.create({
      username: username,
      email: email,
      password: hashedPWD,
      phone: phone,
      address: address,
      university: university,
      position: position,
    });

    res.status(200).json({ success: ` created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
module.exports = { handleNewLecturer, handleNewUser, handleNewStudentWelfare };

// import User from "../models/User";
// import AuditLog from "../models/AuditLog";
// import { Request, Response } from "express";

// /**
//  * GET USERS (PAGINATED)
//  */
// export const getUsers = async (req: Request, res: Response) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const [users, total] = await Promise.all([
//     User.find().skip(skip).limit(limit),
//     User.countDocuments(),
//   ]);

//   res.json({
//     users,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//   });
// };

// /**
//  * UPDATE ROLE (ADMIN)
//  */
// export const updateUserRole = async (req: any, res: Response) => {
//   const { role, department } = req.body;

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { role, department: role === "authority" ? department : null },
//     { new: true }
//   );

//   await AuditLog.create({
//     adminId: req.user.id,
//     adminName: req.user.name,
//     action: `Updated role of ${user?.email} to ${role}`,
//   });

//   res.json(user);
// };

// /**
//  * DELETE USER
//  */
// export const deleteUser = async (req: any, res: Response) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   await AuditLog.create({
//     adminId: req.user.id,
//     adminName: req.user.name,
//     action: `Deleted user ${user?.email}`,
//   });

//   res.json({ message: "User deleted" });
// };


import { Request, Response } from "express";
import User from "../models/user.model";
import AuditLog from "../models/auditLog.model";

/**
 * GET USERS (with pagination)
 * /api/users?page=1&limit=5
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      User.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      User.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalUsers,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


/**
 * UPDATE USER ROLE
 * PUT /api/admin/users/:id/role
 */
// export const updateUserRole = async (req: Request, res: Response) => {
//   try {
//     const { role } = req.body;

//     if (!role) {
//       return res.status(400).json({ message: "Role is required" });
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Audit Log
//     await AuditLog.create({
//       action: `Updated role to ${role}`,
//       adminName: req.user?.name || "Admin",
//     });

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update role" });
//   }
// };

// /**
//  * DELETE USER
//  * DELETE /api/admin/users/:id
//  */
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Audit Log
//     await AuditLog.create({
//       action: "Deleted user",
//       adminName: req.user?.name || "Admin",
//     });

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user" });
//   }
// };

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Failed to update role" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
export const updateUserDepartment = async (req: Request, res: Response) => {
  try {
    const { department } = req.body;

    if (!department) {
      return res.status(400).json({ message: "Department is required" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // allow department only for authority
    if (user.role !== "authority") {
      return res
        .status(400)
        .json({ message: "Department can be assigned only to authority" });
    }

    user.department = department;
    await user.save();

    res.status(200).json({
      message: "Department updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update department" });
  }
};


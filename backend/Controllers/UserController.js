import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      const { name, email, password, skills, about } = req.body;
  
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
  
      if (skills) {
        for (const skill of skills) {
          if (skill.image) {
            await cloudinary.v2.uploader.destroy(skill.image.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(skill.image, {
              folder: "portfolio",
              resource_type: "image",
            });
            skill.image = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }
        }
      }
  
      if (about) {
        if (about.avatar) {
          await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
          const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
            folder: "portfolio",
            resource_type: "image",
          });
          user.about.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
        // Update other about properties
        user.about.name = about.name;
        user.about.title = about.title;
        user.about.subtitle = about.subtitle;
        user.about.description = about.description;
        user.about.quote = about.quote;
      }
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User Updated Successfully",
      });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(400).json({
          success: false,
          message: "An error occurred while updating the user.",
          error: error.message,
        });
      }
  };
  
  
  
  // export const addProject = async (req, res) => {
  //   try {
  //     const { url, title, image, description, techStack } = req.body;
  
  //     const user = await User.findById(req.user._id);
  
  //     const myCloud = await cloudinary.v2.uploader.upload(image, {
  //       folder: 'Portfolio',
  //       resource_type: 'image',
  //     });
  
  //     user.projects.unshift({
  //       url,
  //       title,
  //       description,
  //       techStack,
  //       image: {
  //         public_id: myCloud.public_id,
  //         url: myCloud.secure_url,
  //       },
  //     });
  
  //     await user.save();
  
  //     res.status(200).json({
  //       success: true,
  //       message: 'Added To Projects',
  //     });
  //   } catch (error) {
  //     return res.status(400).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // };
  export const addProject = async (req, res) => {
    try {
      const { url, title, image, description, techStack } = req.body;
  
      const user = await User.findById(req.user._id);
  
      const myCloud = await cloudinary.v2.uploader.upload(image, {  // Use image.url here
        folder: 'Portfolio',
        resource_type: 'image',
      });
  
      user.projects.unshift({
        url,
        title,
        description,
        techStack,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Added To Projects',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const addSkill = async (req, res) => {
  try {
    const { name, category, image } = req.body;
    const user = await User.findById(req.user._id);

    // Upload the image to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
      resource_type: "image",
    });

    // Create a new skill object
    const newSkill = {
      name,
      category,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    // Push the new skill to the user's skills array
    user.skills.push(newSkill);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Skill Added Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const skill = user.skills.find((item) => item._id == id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Delete the image from Cloudinary
    await cloudinary.v2.uploader.destroy(skill.image.public_id);

    user.skills = user.skills.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

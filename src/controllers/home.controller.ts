const getHomePage = async (req, res) => {
  try {
    res.render("home", {
      coder: {
        name: "Ái Nga",
        email: "ainga01012004@gmail.com",
        skills: ["React,js", "Next.js", "Node.js", "JavaScript", "Express"],
        github: "https://github.com/AiNga04",
      },
    });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default getHomePage;

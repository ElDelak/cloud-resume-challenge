const resumeData = {
  person: {
    name: "Khaled Mabrouk",
    address: "1825 Rue Saint-Rose, Montreal, QC H2K 4M1, Canada",
    email: "mabrouk.kha@gmail.com",
    phone: "+1 514-995-9567",
  },
  sections: {
    education: [
      {
        id: 1,
        title: "Baccalauréat",
        institution:
          "Institut Supérieur des Sciences Appliquées et de Technologie",
        location: "Sousse, Tunisia",
        year: "2009",
      },
    ],
    experience: [
      {
        id: 2,
        title: "IT Developper",
        company: "Levio inc",
        location: "Montreal, QC",
        duration: "2022-now",
        tasks: ["frontend developper at desjardins", ".net developper at MRNF"],
      },
      {
        id: 3,
        title: "Engineer / IOT system",
        company: "CPG",
        location: "Gafsa, Tunisia",
        duration: "2016-2022",
        tasks: [
          "Built an IoT system (hardware and software) to remotely monitor production.",
        ],
      },
      {
        id: 4,
        title: "It Developer",
        company: "Archimed / Neoledge",
        location: "Tunis, Tunisia",
        duration: "2010 - 1016",
        tasks: [
          "Develop and integrate EDM (Electronic Document Management) solutions",
          "Develop the physical archives management platform",
        ],
      },
    ],
    skills: [
      {
        id: 5,
        title: "Cloud Architecture",
        tasks: [
          "As a it developper I would like to learn also Cloud Architecture",
        ],
      },
      {
        id: 6,
        title: "AWS Certification",
        tasks: [
          "I’m currently in the process of renewing the AWS Certified Solutions Architect – Associate certification.",
        ],
      },
    ],
  },
};

export default resumeData;

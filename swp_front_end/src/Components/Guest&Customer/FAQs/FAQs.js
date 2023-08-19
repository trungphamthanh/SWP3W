import React, { useState, useEffect } from "react";
import "./FAQs.scss";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BoxBackground from "../../asset/images/BannerImage2.avif";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
  const [expanded, setExpanded] = useState(false);
  const [faqsData, setFaqsData] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    // Fetch FAQs data from API
    fetch("YOUR_API_URL")
      .then((response) => response.json())
      .then((data) => setFaqsData(data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div className="faqs-container">
      <Header />
      <Banner />

      <div
        className="accordion-container"
        style={{ background: `url(${BoxBackground})` }}
      >
        <h1>Frequently Asked Questions</h1>
        <div
          style={{
            width: "70%",
            margin: "auto",
            boxShadow: "0 0 20px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          {faqsData.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "#1257ab",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <Typography sx={{ flexShrink: 0 }}>{faq.header}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#d4e7fd" }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
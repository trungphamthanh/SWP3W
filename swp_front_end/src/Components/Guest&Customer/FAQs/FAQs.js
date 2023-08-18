import React, { useState } from "react";
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
import { FAQsMap } from "./FAQsMap";

const FAQs = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [faqData, setFaqData] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        {FAQsMap.map((faq) => (
          <div>
          <Accordion
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
              <Typography sx={{ flexShrink: 0 }}>
                {faq.header}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#d4e7fd" }}>
              <Typography>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
          </div>
        ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
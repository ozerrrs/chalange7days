import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  display: "flex",
  overflow: "hidden",
  minWidth: 1000,
  margin: "0 auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

const SideBar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "10px 10px 10px 10px",
  color: "white",
  width: 274,
  position: "relative",
  overflow: "hidden",

  minHeight: 568,
}));

const ContentArea = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: "100%",
}));

const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#04285a",
  color: "white",
  borderRadius: 8,
  padding: "10px 24px",
  textTransform: "none", // This prevents uppercase text

  "&:hover": {
    backgroundColor: "#172b4d",
  },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderRadius: "10px",
    },
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "2px solid white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  opacity: (props) => (props.active ? 1 : 0.7),
}));

const steps = [
  { label: "YOUR INFO", description: "Personal details" },
  { label: "SELECT PLAN", description: "Choose your plan" },
  { label: "ADD-ONS", description: "Add extra features" },
  { label: "SUMMARY", description: "Review your order" },
];

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "#04285a" }}
            >
              Personal info
            </Typography>
            <Typography color="textSecondary" paragraph>
              Please provide your name, email address, and phone number.
            </Typography>

            <Box mt={3}>
              <Typography fontWeight={500} mb={1} sx={{ color: "#04285a" }}>
                Name
              </Typography>
              <StyledTextField
                fullWidth
                placeholder="e.g. Stephen King"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
              />

              <Typography fontWeight={500} mb={1} sx={{ color: "#04285a" }}>
                Email Address
              </Typography>

              <StyledTextField
                fullWidth
                placeholder="e.g. stephenking@lorem.com"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
              />

              <Typography fontWeight={500} mb={1} sx={{ color: "#04285a" }}>
                Phone Number
              </Typography>

              <StyledTextField
                fullWidth
                placeholder="e.g. +1 234 567 890"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mb: 8 }}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <img src={backgroundNav} alt="background" />
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Select your plan
            </Typography>
            <Typography color="textSecondary" paragraph>
              You have the option of monthly or yearly billing.
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Pick add-ons
            </Typography>
            <Typography color="textSecondary" paragraph>
              Add-ons help enhance your gaming experience.
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Summary
            </Typography>
            <Typography color="textSecondary" paragraph>
              Please confirm your selections.
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <FormContainer>
      <SideBar>
        {steps.map((step, index) => (
          <StepItem key={index} active={activeStep === index}>
            <StepNumber>{index + 1}</StepNumber>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                STEP {index + 1}
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                {step.label}
              </Typography>
            </Box>
          </StepItem>
        ))}
      </SideBar>

      <ContentArea>
        {getStepContent(activeStep)}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <NextButton variant="contained" onClick={handleNext}>
            Next Step
          </NextButton>
        </Box>
      </ContentArea>
    </FormContainer>
  );
}

export default MultiStepForm;

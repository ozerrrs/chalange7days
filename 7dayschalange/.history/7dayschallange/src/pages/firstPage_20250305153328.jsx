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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
// Import the background image for the sidebar
import backgroundNav from "../assets/bg-sidebar-desktop.svg"; // Adjust the path as needed

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  display: "flex",
  overflow: "hidden",
  minWidth: 1000,
  minHeight: 640,
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
  background: "none",
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

const StepNumber = styled(Box)(({ theme, active }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "2px solid white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  backgroundColor: active ? "#c3e0ff" : "transparent", // Blue background when active
  color: active ? "#04285a" : "white",
  fontWeight: 500,
}));

const StepItem = styled(Box)(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  opacity: active ? 1 : 0.7,
}));

const PlanCard = styled(Box)(({ theme, selected }) => ({
  padding: theme.spacing(1),
  borderRadius: 8,
  flex: 1,
  border: selected ? "2px solid #04285a" : "1px solid #ccc",
  backgroundColor: selected ? "#f8f9ff" : "transparent",
  cursor: "pointer",
  width: "150px",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  "&:hover": {
    borderColor: "#04285a",
  },
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
    plan: "arcade", // Default plan
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlanChange = (event) => {
    setFormData({
      ...formData,
      plan: event.target.value,
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
              />

              <Typography fontWeight={500} mb={1} sx={{ color: "#04285a" }}>
                Phone Number
              </Typography>

              <StyledTextField
                fullWidth
                placeholder="e.g. +1 234 567 890"
                name="phone"
                value={formData.phone}
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
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "#04285a" }}
            >
              Select your plan
            </Typography>
            <Typography color="textSecondary" paragraph>
              You have the option of monthly or yearly billing.
            </Typography>

            <FormControl component="fieldset" sx={{ width: "100%", mt: 3 }}>
              <RadioGroup
                aria-label="plan"
                name="plan"
                value={formData.plan}
                onChange={handlePlanChange}
                sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}
              >
                <FormControlLabel
                  value="arcade"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "arcade"}>
                      <Box sx={{ width: "100%" }}>
                        <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                          Arcade
                        </Typography>
                        <Typography color="textSecondary">$9/mo</Typography>
                      </Box>
                    </PlanCard>
                  }
                  sx={{ margin: 0, flex: 1, width: "100%" }}
                />

                <FormControlLabel
                  value="advanced"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "advanced"}>
                      <Box sx={{ width: "100%" }}>
                        <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                          Advanced
                        </Typography>
                        <Typography color="textSecondary">$12/mo</Typography>
                      </Box>
                    </PlanCard>
                  }
                  sx={{ margin: 0, flex: 1, width: "100%" }}
                />

                <FormControlLabel
                  value="pro"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "pro"}>
                      <Box sx={{ width: "100%" }}>
                        <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                          Pro
                        </Typography>
                        <Typography color="textSecondary">$15/mo</Typography>
                      </Box>
                    </PlanCard>
                  }
                  sx={{ margin: 0, flex: 1, width: "100%" }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "#04285a" }}
            >
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
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "#04285a" }}
            >
              Summary
            </Typography>
            <Typography color="textSecondary" paragraph>
              Please confirm your selections.
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: "#f8f9ff", borderRadius: 2 }}>
              <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                Selected Plan:{" "}
                {formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <FormContainer>
      <SideBar>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <img
            src={backgroundNav}
            alt="background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {steps.map((step, index) => (
            <StepItem key={index} active={activeStep === index}>
              <StepNumber active={activeStep === index}>{index + 1}</StepNumber>

              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  STEP {index + 1}
                </Typography>
                <Typography variant="subtitle2">{step.label}</Typography>
              </Box>
            </StepItem>
          ))}
        </Box>
      </SideBar>

      <ContentArea>
        {getStepContent(activeStep)}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 45, color: "#99989d" }}>
              Go Back
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

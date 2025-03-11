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
  FormGroup,
  Switch,
  Checkbox,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
// Import the background image for the sidebar
import backgroundNav from "../assets/bg-sidebar-desktop.svg";
import arcadeIcon from "../assets/icon-arcade.svg";
import advancedIcon from "../assets/icon-advanced.svg";
import proIcon from "../assets/icon-pro.svg";

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
  height: 568, // Fixed height to match sidebar
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // This will push the button to the bottom
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
  border: selected ? "1px solid #544e98" : "1px solid #ccc",
  backgroundColor: selected ? "#f8f9ff" : "transparent",
  cursor: "pointer",
  width: "150px",
  height: "180px",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",

  "&:hover": {
    borderColor: "#04285a",
  },
}));

const MonthlyYearlyCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: 4,
  backgroundColor: "#f8f9ff",
  width: "100%",
  height: "50px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

const AddOnsCard = styled(Box)(({ theme, selected }) => ({
  paddingTop: theme.spacing(2),
  borderRadius: 8,
  flex: 1,
  border: selected ? "1px solid #544e98" : "1px solid #ccc",
  backgroundColor: selected ? "#f8f9ff" : "transparent",
  cursor: "pointer",
  width: "80%",
  height: "90px",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",

  "&:hover": {
    borderColor: "#04285a",
  },
}));
const PickCheckBox = styled(Checkbox)(({ theme }) => ({
  color: "#ccc",
  "&.Mui-checked": {
    color: "#544e98",
  },
}));

const CustomStyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    opacity: 1,
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "white",
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#172b4d",
    opacity: 1,
  },
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: "#172b4d",
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
    plan: "arcade",
    billingCycle: "monthly",
    pickArray: [],
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

  const handleBillingCycleChange = (event) => {
    setFormData({
      ...formData,
      billingCycle: event.target.checked ? "yearly" : "monthly",
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
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }} // Further reduced gap between plan cards
              >
                <FormControlLabel
                  value="arcade"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "arcade"}>
                      <img
                        src={arcadeIcon}
                        alt="background"
                        style={{
                          width: "40%",
                          height: "40%",
                          objectFit: "contain",
                        }}
                      />
                      <Box sx={{ width: "100%" }}>
                        <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                          Arcade
                        </Typography>
                        <Typography color="textSecondary">
                          {formData.billingCycle === "monthly"
                            ? "$9/mo"
                            : "$90/yr"}
                        </Typography>
                        {formData.billingCycle === "yearly" && (
                          <Typography variant="caption" color="primary">
                            2 months free
                          </Typography>
                        )}
                      </Box>
                    </PlanCard>
                  }
                  sx={{ margin: 0, flex: 1 }}
                />

                <FormControlLabel
                  value="advanced"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "advanced"}>
                      <img
                        src={advancedIcon}
                        alt="background"
                        style={{
                          width: "40%",
                          height: "40%",
                          objectFit: "contain",
                        }}
                      />
                      <Box sx={{ width: "100%" }}>
                        <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                          Advanced
                        </Typography>
                        <Typography color="textSecondary">
                          {formData.billingCycle === "monthly"
                            ? "$12/mo"
                            : "$120/yr"}
                        </Typography>
                        {formData.billingCycle === "yearly" && (
                          <Typography variant="caption" color="primary">
                            2 months free
                          </Typography>
                        )}
                      </Box>
                    </PlanCard>
                  }
                  sx={{ margin: 0, flex: 1 }}
                />

                <FormControlLabel
                  value="pro"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "pro"}>
                      <img
                        src={proIcon}
                        alt="background"
                        style={{
                          width: "40%",
                          height: "40%",
                          objectFit: "contain",
                        }}
                      />
                      <Box sx={{ width: "100%" }}>
                        <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                          Pro
                        </Typography>
                        <Typography color="textSecondary">
                          {formData.billingCycle === "monthly"
                            ? "$15/mo"
                            : "$150/yr"}
                        </Typography>
                        {formData.billingCycle === "yearly" && (
                          <Typography variant="caption" color="primary">
                            2 months free
                          </Typography>
                        )}
                      </Box>
                    </PlanCard>
                  }
                  sx={{ margin: 0, flex: 1 }}
                />
              </RadioGroup>
            </FormControl>

            <MonthlyYearlyCard>
              <Typography
                fontWeight={
                  formData.billingCycle === "monthly" ? "bold" : "normal"
                }
                sx={{
                  color:
                    formData.billingCycle === "monthly" ? "#04285a" : "gray",
                  mr: 4,
                }}
              >
                Monthly
              </Typography>

              <FormControlLabel
                control={
                  <CustomStyledSwitch
                    checked={formData.billingCycle === "yearly"}
                    onChange={handleBillingCycleChange}
                  />
                }
                label=""
              />

              <Typography
                fontWeight={
                  formData.billingCycle === "yearly" ? "bold" : "normal"
                }
                sx={{
                  color:
                    formData.billingCycle === "yearly" ? "#04285a" : "gray",
                  ml: 4,
                }}
              >
                Yearly
              </Typography>
            </MonthlyYearlyCard>
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

            <Box>
              <AddOnsCard selected={formData.pickArray[0] === "online-service"}>
                <Box>
                  <PickCheckBox sx={{ mr: "10px", ml: "10px" }}></PickCheckBox>
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                    Online service
                  </Typography>
                  <Typography color="textSecondary">
                    Access to multiplayer services
                  </Typography>
                </Box>
                <Typography color="#544e98" sx={{ mr: "10px" }}>
                  {formData.billingCycle === "monthly" ? "$15/mo" : "$150/yr"}
                </Typography>
              </AddOnsCard>
            </Box>

            {/* Add-ons content will go here */}
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
                {formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)}{" "}
                ({formData.billingCycle})
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
        <Box>{getStepContent(activeStep)}</Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          {activeStep !== 0 ? (
            <Button onClick={handleBack} sx={{ color: "#99989d" }}>
              Go Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain spacing
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

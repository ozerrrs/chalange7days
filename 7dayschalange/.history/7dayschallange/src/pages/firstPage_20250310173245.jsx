import React, { useState, useEffect } from "react";
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
import thankIcon from "../assets/icon-thank-you.svg";

// Component styles remain the same...
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

const FinishCard = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingInline: theme.spacing(2),
  borderRadius: 4,
  backgroundColor: "#f8f9ff",
  width: "80%",
  height: "170px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const AddOnsCard = styled(Box)(({ theme, selected }) => ({
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
  alignItems: "center",
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

// Plan price configuration
const planPrices = {
  Arcade: { Monthly: "$9/mo", Yearly: "$90/yr" },
  Advanced: { Monthly: "$12/mo", Yearly: "$120/yr" },
  Pro: { Monthly: "$15/mo", Yearly: "$150/yr" },
};

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    billingCycle: "Monthly",
    online: false,
    large: false,
    custom: false,
    planprice: "$9/mo", // Default price for Arcade Monthly
  });

  // Update plan price whenever plan or billing cycle changes
  useEffect(() => {
    const newPrice = planPrices[formData.plan]?.[formData.billingCycle] || "$0";
    setFormData((prev) => ({
      ...prev,
      planprice: newPrice,
    }));
  }, [formData.plan, formData.billingCycle]);

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
      billingCycle: event.target.checked ? "Yearly" : "Monthly",
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Calculate total price for the summary page
  const calculateTotalPrice = () => {
    let basePrice = 0;
    let addOnsPrice = 0;
    let suffix = "/mo";

    // Extract base price from planprice
    const priceValue = formData.planprice.replace(/[^0-9]/g, "");
    basePrice = parseInt(priceValue, 10) || 0;

    if (formData.billingCycle === "Yearly") {
      suffix = "/yr";
      // Add add-ons costs
      if (formData.online) addOnsPrice += 10;
      if (formData.large) addOnsPrice += 20;
      if (formData.custom) addOnsPrice += 20;
    } else {
      // Monthly prices
      if (formData.online) addOnsPrice += 1;
      if (formData.large) addOnsPrice += 2;
      if (formData.custom) addOnsPrice += 2;
    }

    return `$${basePrice + addOnsPrice}${suffix}`;
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
              You have the option of Monthly or Yearly billing.
            </Typography>

            <FormControl component="fieldset" sx={{ width: "100%", mt: 3 }}>
              <RadioGroup
                aria-label="plan"
                name="plan"
                value={formData.plan}
                onChange={handlePlanChange}
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
              >
                <FormControlLabel
                  value="Arcade"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "Arcade"}>
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
                          {formData.billingCycle === "Monthly"
                            ? "$9/mo"
                            : "$90/yr"}
                        </Typography>
                        {formData.billingCycle === "Yearly" && (
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
                  value="Advanced"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "Advanced"}>
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
                          {formData.billingCycle === "Monthly"
                            ? "$12/mo"
                            : "$120/yr"}
                        </Typography>
                        {formData.billingCycle === "Yearly" && (
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
                  value="Pro"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <PlanCard selected={formData.plan === "Pro"}>
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
                          {formData.billingCycle === "Monthly"
                            ? "$15/mo"
                            : "$150/yr"}
                        </Typography>
                        {formData.billingCycle === "Yearly" && (
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
                  formData.billingCycle === "Monthly" ? "bold" : "normal"
                }
                sx={{
                  color:
                    formData.billingCycle === "Monthly" ? "#04285a" : "gray",
                  mr: 4,
                }}
              >
                Monthly
              </Typography>

              <FormControlLabel
                control={
                  <CustomStyledSwitch
                    checked={formData.billingCycle === "Yearly"}
                    onChange={handleBillingCycleChange}
                  />
                }
                label=""
              />

              <Typography
                fontWeight={
                  formData.billingCycle === "Yearly" ? "bold" : "normal"
                }
                sx={{
                  color:
                    formData.billingCycle === "Yearly" ? "#04285a" : "gray",
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

            <Box sx={{ mt: 5 }}>
              <AddOnsCard selected={formData.online === true}>
                <Box>
                  <PickCheckBox
                    checked={formData.online}
                    onChange={(e) =>
                      setFormData({ ...formData, online: e.target.checked })
                    }
                    sx={{ mr: 2, ml: 2 }}
                  ></PickCheckBox>
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                    Online service
                  </Typography>
                  <Typography color="textSecondary">
                    Access to multiplayer services
                  </Typography>
                </Box>
                <Typography color="#544e98" sx={{ mr: 2 }}>
                  {formData.billingCycle === "Monthly" ? "+$1/mo" : "+$10/yr"}
                </Typography>
              </AddOnsCard>
            </Box>
            <Box sx={{ mt: 3 }}>
              <AddOnsCard selected={formData.large === true}>
                <Box>
                  <PickCheckBox
                    checked={formData.large}
                    onChange={(e) =>
                      setFormData({ ...formData, large: e.target.checked })
                    }
                    sx={{ mr: 2, ml: 2 }}
                  ></PickCheckBox>
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                    Large storage
                  </Typography>
                  <Typography color="textSecondary">
                    Extra 1TB cloud save
                  </Typography>
                </Box>
                <Typography color="#544e98" sx={{ mr: 2 }}>
                  {formData.billingCycle === "Monthly" ? "+$2/mo" : "+$20/yr"}
                </Typography>
              </AddOnsCard>
            </Box>
            <Box sx={{ mt: 3 }}>
              <AddOnsCard selected={formData.custom === true}>
                <Box>
                  <PickCheckBox
                    checked={formData.custom}
                    onChange={(e) =>
                      setFormData({ ...formData, custom: e.target.checked })
                    }
                    sx={{ mr: 2, ml: 2 }}
                  ></PickCheckBox>
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                    Customizable profile
                  </Typography>
                  <Typography color="textSecondary">
                    Custom theme on your profile
                  </Typography>
                </Box>
                <Typography color="#544e98" sx={{ mr: 2 }}>
                  {formData.billingCycle === "Monthly" ? "+$2/mo" : "+$20/yr"}
                </Typography>
              </AddOnsCard>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",

              mt: 2,

              pt: 2,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "#04285a" }}
            >
              Finishing up
            </Typography>
            <Typography color="textSecondary" paragraph>
              Double check everything looks OK before confirming.
            </Typography>
            <FinishCard>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  borderBottom: "1px  solid #ccc",
                  paddingBottom: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography fontWeight="bold" sx={{ color: "#04285a" }}>
                    {formData.plan} ({formData.billingCycle})
                  </Typography>
                  <Button
                    onClick={() => setActiveStep(1)} // Go back to plan selection
                    sx={{
                      color: "#99989d",
                      fontSize: "14px",
                      textTransform: "none",
                      textDecoration: "underline",
                      padding: "0",
                      minWidth: "auto",
                      justifyContent: "flex-start",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Change
                  </Button>
                </Box>

                <Typography fontWeight="bold" sx={{ color: "#04285a", mr: 2 }}>
                  {formData.planprice}
                </Typography>
              </Box>
              {(formData.online || formData.large || formData.custom) && (
                <Box sx={{ width: "100%" }}>
                  {formData.online && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#99989d",
                          fontSize: "14px",
                          textTransform: "none",
                          padding: "0",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                        }}
                      >
                        Online service
                      </Typography>
                      <Typography
                        sx={{
                          color: "#04285a",
                          fontSize: "14px",
                          textTransform: "none",
                          mr: 2,
                        }}
                      >
                        {formData.billingCycle === "Monthly"
                          ? "+$1/mo"
                          : "+$10/yr"}
                      </Typography>
                    </Box>
                  )}

                  {formData.large && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#99989d",
                          fontSize: "14px",
                          textTransform: "none",
                          padding: "0",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                        }}
                      >
                        Large storage
                      </Typography>
                      <Typography
                        sx={{
                          color: "#04285a",
                          fontSize: "14px",
                          textTransform: "none",
                          mr: 2,
                        }}
                      >
                        {formData.billingCycle === "Monthly"
                          ? "+$2/mo"
                          : "+$20/yr"}
                      </Typography>
                    </Box>
                  )}

                  {formData.custom && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#99989d",
                          fontSize: "14px",
                          textTransform: "none",
                          padding: "0",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                        }}
                      >
                        Customizable profile
                      </Typography>
                      <Typography
                        sx={{
                          color: "#04285a",
                          fontSize: "14px",
                          textTransform: "none",
                          mr: 2,
                        }}
                      >
                        {formData.billingCycle === "Monthly"
                          ? "+$2/mo"
                          : "+$20/yr"}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </FinishCard>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",

                mt: 2,

                pt: 2,
              }}
            >
              <Typography color="textSecondary">
                Total (per{" "}
                {formData.billingCycle === "Monthly" ? "month" : "year"})
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{ color: "#544e98", fontSize: "1.2rem", mr: 2 }}
              >
                {calculateTotalPrice()}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "100px",
              }}
            >
              <Box sx={{ display: "flex", mb: 10 }}>
                <img
                  src={thankIcon}
                  alt="background"
                  style={{
                    mb: 4,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", color: "#04285a", fontSize: "30px" }}
              >
                Thank you!
              </Typography>
            </Box>
            <Box>
              <Typography>
                Thank you! Thanks for confirming your subscription! We hope you
                have fun using our platform. If you ever need support, please
                feel free to email us at support@loremgaming.com.
              </Typography>
            </Box>
          </>
        );
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
            {activeStep === steps.length - 1 ? "Confirm" : "Next Step"}
          </NextButton>
        </Box>
      </ContentArea>
    </FormContainer>
  );
}

export default MultiStepForm;

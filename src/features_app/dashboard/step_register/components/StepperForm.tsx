import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormCompanyDetail from './FormCompanyDetail';
import {
    Paper
} from '@mui/material';
import FormUserManagement from './FormUserManagement';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import FormLegalDocument from './FormLegalDocument';

const steps = ['Company Detail', 'Legal Document', 'Users Team Management'];

export default function StepperForm() {
  const initialStep = useSelector((state : RootState) => state.step_state)

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(initialStep.step_state)
  }, [initialStep])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={2}>
          <Box p={3}>
          <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                  optional?: React.ReactNode;
              } = {};
              return (
                  <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                      <h3>{label}</h3>
                      </StepLabel>
                  </Step>
              );
              })}
          </Stepper>
          </Box>
      </Paper>


      <React.Fragment>
      { activeStep === 0 ? (
            <Paper elevation={2}>
              <Box p={3} mt={2}>
                  <Box>
                      <FormCompanyDetail
                          profile={false}
                      />
                  </Box>
              </Box>
            </Paper>
      ) : activeStep === 1 ? (
            <Paper elevation={2}>
              <Box p={3} mt={2}>
                  <Box>
                      <FormLegalDocument
                      />
                  </Box>
              </Box>
            </Paper>
      ) : (
            <Paper elevation={2}>
              <Box p={3} mt={2}>
                  <Box>
                      <FormUserManagement
                      />
                  </Box>
              </Box>
            </Paper>
      ) }
      </React.Fragment>
    </Box>
  );
}

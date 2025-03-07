/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { UserFormType } from "@/components/user/user.type";

interface PasswordStrengthProps {
  name: any;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const STRENGTH_CONFIG = {
  minLength6: 6,
  minLength8: 8,
  maxStrength: 5,
} as const;

const strengthRules = [
  (pwd: string) => pwd.length >= STRENGTH_CONFIG.minLength6,
  (pwd: string) => pwd.length >= STRENGTH_CONFIG.minLength8,
  (pwd: string) => /[A-Z]/.test(pwd),
  (pwd: string) => /[0-9]/.test(pwd),
  (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
];

const STRENGTH_LEVELS = {
  weak: { max: 1, color: "#ff4d4d", label: "Weak" },
  moderate: { min: 2, max: 3, color: "#ffd700", label: "Moderate" },
  strong: { min: 4, color: "#4caf50", label: "Strong" },
} as const;

const calculateStrength = (password: string): number => {
  return strengthRules.reduce((acc, rule) => acc + (rule(password) ? 1 : 0), 0);
};

const getStrengthLevel = (strength: number) => {
  if (strength <= STRENGTH_LEVELS.weak.max) return STRENGTH_LEVELS.weak;
  if (strength <= STRENGTH_LEVELS.moderate.max) return STRENGTH_LEVELS.moderate;
  return STRENGTH_LEVELS.strong;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = memo(({ name }) => {
  const { control } = useFormContext<UserFormType>();

  const password = useWatch({ control, name, defaultValue: "" });

  const debouncedPassword = useDebounce(password, 300);

  const strengthInfo = useMemo(() => {
    if (!debouncedPassword) return null;

    const strength = calculateStrength(debouncedPassword);
    const percentage = (strength / STRENGTH_CONFIG.maxStrength) * 100;
    const { color, label } = getStrengthLevel(strength);

    return { strength, percentage, color, label };
  }, [debouncedPassword]);

  if (!strengthInfo) return null;

  return (
    <Box
      mt={1}
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
    >
      <LinearProgress
        variant="determinate"
        value={strengthInfo.percentage}
        sx={{
          flex: 4,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor: strengthInfo.color,
          },
        }}
      />
      <Typography
        variant="subtitle1"
        fontWeight={"medium"}
        sx={{ flex: 0.4, color: strengthInfo.color, mt: 0.5, display: "block" }}
      >
        {strengthInfo.label}
      </Typography>
    </Box>
  );
});

PasswordStrength.displayName = "PasswordStrength";

export default PasswordStrength;

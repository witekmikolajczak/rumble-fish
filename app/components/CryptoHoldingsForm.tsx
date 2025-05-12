import type { Cryptocurrency, Holding } from "~/store/cryptoSlice";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

import { useAppDispatch } from "../store";
import { cryptoActions } from "../store/cryptoSlice";
import { formatUSD } from "../utils/format";

interface Props {
  crypto: Cryptocurrency;
}

export default function CryptoHoldingsForm({ crypto }: Props) {
  const dispatch = useAppDispatch();

  // Form state for holdings
  const [amount, setAmount] = useState<string>(
    crypto.holdings?.value.toString() ?? ""
  );
  const [unit, setUnit] = useState<string>(crypto.holdings?.unit ?? "main");
  const [comment, setComment] = useState<string>(
    crypto.holdings?.comment ?? ""
  );

  // Calculate USD value based on holdings
  const numericValue = Number(amount) || 0;
  const usdValue = numericValue * crypto.priceUsd;

  /**
   * Handle form submission for updating holdings
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Holding = {
      value: numericValue,
      unit: unit as any,
      comment,
    };
    dispatch(
      cryptoActions.holdingsUpdated({ id: crypto.id, holdings: payload })
    );
  };

  const handleAmountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setAmount(val);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleUnitChange = (e: SelectChangeEvent<string>) => {
    setUnit(e.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
      <Typography fontSize={18} sx={{ mb: 1 }}>
        Value in USD: {formatUSD(usdValue)}
      </Typography>

      <FormControl fullWidth margin="dense" variant="standard">
        <InputLabel
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
              transform: "translate(0, -1.5px) scale(0.75)",
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(0, -1.5px) scale(0.75)",
            },
          }}
          shrink={true}
        >
          Amount
        </InputLabel>
        <Input
          type="text"
          value={amount}
          onChange={handleAmountValueChange}
          fullWidth
          margin="dense"
          sx={{
            backgroundColor: "#545454",
            borderRadius: "4px",
            color: "white",
            "&:before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
            "& .MuiInput-input": {
              padding: "8.5px 14px",
              marginTop: "8px",
            },
            border: "1px solid white",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
          inputProps={{
            inputMode: "decimal",
            step: "0.000001",
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="dense" variant="standard">
        <InputLabel
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
              transform: "translate(0, -1.5px) scale(0.75)",
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(0, -1.5px) scale(0.75)",
            },
          }}
          shrink={true}
        >
          Unit
        </InputLabel>
        <Select
          value={unit}
          onChange={handleUnitChange}
          sx={{
            backgroundColor: "#545454",
            borderRadius: "4px",
            color: "white",
            "&:before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
            "& .MuiSelect-select": {
              padding: "8.5px 14px",
              marginTop: "8px",
              textAlign: "left",
            },
            border: "1px solid white",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.8)",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#545454",
                color: "white",
                "& .MuiMenuItem-root": {
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="main">Main ({crypto.symbol})</MenuItem>
          <MenuItem value="satoshi">Satoshi/Base Unit</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="dense" variant="standard">
        <InputLabel
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
              transform: "translate(0, -1.5px) scale(0.75)",
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(0, -1.5px) scale(0.75)",
            },
          }}
          shrink={true}
        >
          Comment
        </InputLabel>
        <Input
          value={comment}
          onChange={handleCommentChange}
          sx={{
            backgroundColor: "#545454",
            borderRadius: "4px",
            color: "white",
            "&:before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
            "& .MuiInput-input": {
              padding: "8.5px 14px",
              marginTop: "8px",
            },
            border: "1px solid white",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
      </FormControl>

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          marginTop: "24px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#2F8D2F",
            border: "1px solid white",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

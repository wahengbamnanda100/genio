import {
	FormControlLabel,
	FormGroup,
	Checkbox,
	FormControl,
	Grid,
	FormLabel,
} from "@mui/material";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import _ from "lodash";
import { CheckBoxFieldProps } from ".";
import { ErrorContainer } from "./ErrorContainer";

const CheckBoxField = ({
	title,
	className,
	style,
	row,
	xs,
	sm,
	labelPlacement = "end",
	checkBoxs,
	required,
	hasErrorMessage,
	defaultCheck,
	...restProps
}: CheckBoxFieldProps) => {
	const { control, watch } = useFormContext();
	const { errors } = useFormState({ control });

	return (
		<Grid item xs={xs} sm={sm} className={className} style={style}>
			<FormControl component="fieldset">
				<FormLabel component="legend">{title}</FormLabel>
				<FormGroup aria-label="checkbox" row={row}>
					{checkBoxs.map(({ name, label, ...args }) => (
						<Controller
							key={name}
							name={name}
							control={control}
							render={({ field: { ref, onChange, value } }) => (
								<FormControlLabel
									{...args}
									label={label ?? ""}
									labelPlacement={labelPlacement}
									control={
										<Checkbox
											{...restProps}
											name={name}
											color="primary"
											inputRef={ref}
											checked={value}
											onChange={(e) => onChange(e.target.checked)}
											defaultChecked={defaultCheck}
										/>
									}
								/>
							)}
							rules={{
								validate: () =>
									watch(checkBoxs.map((el) => el.name)).includes(true) ||
									required,
							}}
						/>
					))}
				</FormGroup>
			</FormControl>

			{hasErrorMessage && (
				<ErrorContainer>
					{_.intersection(
						_.keys(errors),
						checkBoxs.map((el) => el.name)
					).length !== 0 && required}
				</ErrorContainer>
			)}
		</Grid>
	);
};

export default CheckBoxField;

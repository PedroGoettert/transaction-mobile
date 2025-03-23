import { Link, useRouter } from "expo-router";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from "@/style/colors";
import z from "zod";
import { useState } from "react";

export default function Login() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginSchema = z.object({
		email: z.string().email(),
		password: z.string().nonempty("campo vazio"),
	});

	type LoginSchema = z.infer<typeof loginSchema>;

	const { handleSubmit, control } = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	async function handleSubmitLogin(dataForm: LoginSchema) {
		try {
			setIsLoading(true);
			const response = await fetch("http://192.168.0.124:3333/login", {
				method: "POST",
				body: JSON.stringify(dataForm),
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
			});

			if (!response.ok) {
				const errorMessage = await response.json();
				alert(errorMessage.message);
				return;
			}

			const data = await response.json(); //Preciso armazenar esse token para poder enviar para outras rotas
			router.replace("/(tabs)/home");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View style={styles.containerScreen}>
			<View style={styles.containerTitle}>
				<Text style={styles.title}>
					Transaction <Text style={styles.spanTitle}>App</Text>{" "}
				</Text>
				<Text style={styles.subTitle}>
					Você no controle das {"\n"}suas contas
				</Text>
			</View>

			<View style={styles.form}>
				{/* Campo de Email */}
				<View style={styles.containerInput}>
					<Text style={styles.textInput}>Email</Text>
					<Controller
						name="email"
						control={control}
						render={({ field: { value, onBlur, onChange } }) => (
							<TextInput
								placeholder="Digite seu email"
								style={styles.input}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholderTextColor={colors.gray[400]}
							/>
						)}
					/>
				</View>

				{/* Campo de Senha */}
				<View style={styles.containerInput}>
					<Text style={styles.textInput}>Senha</Text>
					<Controller
						name="password"
						control={control}
						render={({ field: { value, onBlur, onChange } }) => (
							<TextInput
								placeholder="Digite sua senha"
								style={styles.input}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry
								placeholderTextColor={colors.gray[400]}
							/>
						)}
					/>
				</View>

				{/* Botão de Login */}
				{isLoading ? (
					<TouchableOpacity style={styles.button} disabled>
						<ActivityIndicator color={colors.black} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit(handleSubmitLogin)}
					>
						<Text style={styles.buttonText}>Logar</Text>
					</TouchableOpacity>
				)}
				<View style={styles.containerSignIn}>
					<Text style={styles.textSignIn}>Não possui uma conta? </Text>

					<Link style={styles.buttonSignIn} href={"/(auth)/signin"}>
						Clique aqui
					</Link>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	containerScreen: {
		flex: 1,
		backgroundColor: colors.purple[200],
	},
	containerTitle: {
		justifyContent: "center",
		width: "95%",
		paddingLeft: 20,
		marginTop: 50,
		paddingVertical: 50,
	},
	title: {
		fontSize: 28,
		marginTop: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	spanTitle: {
		color: colors.purple[600],
	},
	subTitle: {
		fontSize: 34,
		fontWeight: "500",
		marginBottom: 16,
	},

	form: {
		flex: 1,
		paddingTop: 12,
		backgroundColor: colors.white,
		borderRadius: 30,
		paddingHorizontal: 16,
	},
	containerInput: {
		paddingVertical: 8,
		gap: 8,
	},
	textInput: {
		fontSize: 16,
		marginLeft: 4,
	},
	input: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.black,
		paddingVertical: 14,
		paddingLeft: 8,
		borderRadius: 10,
	},
	button: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.black,
		paddingVertical: 12,
		marginTop: 18,
		alignItems: "center",
		backgroundColor: colors.purple[100],
		borderRadius: 10,
	},
	buttonText: {
		fontWeight: "bold",
	},
	containerSignIn: {
		justifyContent: "center",
		flexDirection: "row",
		marginTop: 12,
	},
	textSignIn: {
		fontSize: 13,
	},
	buttonSignIn: {
		fontSize: 13,
		borderStyle: "solid",
		borderColor: colors.black,
		borderBottomWidth: 1,
	},
});

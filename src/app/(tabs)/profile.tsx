import { colors } from "@/style/colors";
import { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";

interface UserProps {
	name: string;
	avatar_url: string;
}

export default function Profile() {
	const [user, setUser] = useState<UserProps>();

	useEffect(() => {
		// getUser();
	}, []);

	async function getUser() {
		const response = await fetch("https://api.github.com/users/pedrogoettert");
		const data = await response.json();
		console.log(data);

		setUser(data);
	}

	return (
		<View style={s.profileContainer}>
			<SafeAreaView style={s.header}>
				<Image
					style={s.imageProfile}
					source={{
						uri: "https://avatars.githubusercontent.com/u/104647143?v=4",
					}}
				/>
				<View>
					<Text style={s.textHeader}>Pedro de Souza Goettert</Text>
				</View>
			</SafeAreaView>
		</View>
	);
}

const s = StyleSheet.create({
	profileContainer: {
		flex: 1,
		backgroundColor: colors.gray[800],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	imageProfile: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginLeft: 24,
		marginTop: 24,
		borderStyle: "solid",
		borderColor: colors.green[400],
		borderWidth: 2,
	},
	textHeader: {
		fontWeight: 700,
		color: colors.text,
		fontSize: 17,
	},
});

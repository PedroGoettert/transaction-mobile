import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/style/colors";

export default function layout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colors.gray[300],
					paddingTop: 14,
				},
				tabBarInactiveTintColor: colors.black[200],
				tabBarActiveTintColor: colors.green[400],
				sceneStyle: {
					backgroundColor: colors.gray[800],
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="home" color={color} size={size} />
					),
				}}
			/>

			<Tabs.Screen
				name="transaction"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="plus-circle" color={color} size={size} />
					),
				}}
			/>

			<Tabs.Screen
				name="extract"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="bar-chart-2" color={color} size={size} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="user" color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}

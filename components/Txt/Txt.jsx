import { Text } from "react-native";
import { S } from "./Txt.style";

export function Txt({children, style}){
    return <Text style={[S.text, style]}>{children}</Text>
}
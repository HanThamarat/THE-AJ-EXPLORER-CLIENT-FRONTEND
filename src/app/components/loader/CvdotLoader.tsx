import { SyncLoader } from "react-spinners";

interface DotLoaderType {
    Colors?: string;
}

export default function CvDotLoader({ Colors }: DotLoaderType) {
    return <SyncLoader color={Colors} size={8} />
};
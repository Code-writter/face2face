import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "../../convex/_generated/api"
import { Button } from "./ui/button"
import { updateInterviewStatus } from "../../convex/interview"
import toast from "react-hot-toast"

export default async function EndCallButton(){
    const call = useCall()
    const router = useRouter()
    const { useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()

    const updateInterviewState = useMutation(api.interview.updateInterviewStatus)

    const interview = useQuery(api.interview.getInterviewByStreamCallId, {
        streamCallId : call?.id || ""
    })

    if(!interview || !call){
        return null
    }

    const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id

    if(!isMeetingOwner) return null

    const endCall = async() => {
        try {
            await call.endCall()

            await updateInterviewState({
                id : interview._id,
                status : "completed"
            })

            router.push("/")
            toast.success("Meeting ended for everyone")
        } catch (error) {
            
        }
    }

    return(
        <Button
        variant='destructive'
        onClick={endCall}
        >
            End Meeting
        </Button>
    )
}
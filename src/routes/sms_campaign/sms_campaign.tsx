import { Callout } from "@radix-ui/themes"
import { Info } from "react-feather"


const SmsCampaign = () => {
    return (<>
        <h2>hello world!</h2>


       <div className="pt-2">
       <Callout.Root>
            <Callout.Icon>
                <Info size={18} />
            </Callout.Icon>
            <Callout.Text color="iris">
               Ovde mozete kreirati vase sms kampanje
            </Callout.Text>
        </Callout.Root>
       </div>

    </>)
}
export default SmsCampaign
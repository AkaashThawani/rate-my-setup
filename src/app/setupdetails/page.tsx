import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SetupDetails() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
            <div className="flex flex-col items-center mb-8 h-1/5">
                <h1 className="text-3xl font-bold mb-4">Setup Details</h1>
                <p className="text-lg mb-2">Here you can view your setup.</p>
            </div>
            <div className="flex flex-row flex-nowrap items-stretch justify-center w-full h-4/5">
                <div className="w-1/2"></div>
                <div className="bg-white shadow-md rounded-lg p-6 w-1/2 max-w-md">
                    <div className="text-black mb-2">
                        <Label htmlFor="rating" className="text-black mb-2">Rating (1-5)</Label>
                        <Input id="rating" name="rating" type="number" min="1" max="5" required />
                    </div>
                    <div className="flex flex-col flex-nowrap items-stretch justify-center w-full h-7/8 flex-1">
                        <Label htmlFor="description" className="text-black mb-2">Description</Label>
                        <Textarea id="description" className="flex-1 resize-none" name="description" required />
                        <Button variant="default" className="mt-4 mb-2 bg-black text-white py-2 px-4 rounded cursor-pointer transition duration-300">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
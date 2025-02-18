import { useState } from "react";
import DesignCreate from "./components/DesignCreate";
import DesignList from "./components/DesignList";
import DesignCateManage from "./components/DesignCateMange";

function DesignManagePage() {
    const [change, setChange] = useState(false);

    return (
        <div>
            <div className="d-flex gap-5">
                <DesignCreate setChange={setChange} change={change} />
                <DesignCateManage />
            </div>
            <DesignList change={change} />
        </div>
    );
}

export default DesignManagePage;

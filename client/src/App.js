import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ForKids from "./pages/ForKids"
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";
import "./scss/style.scss"
import { About } from "./pages/About";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import AnnualReports from "./pages/Policies/AnnualReports";
import Safeguarding from "./pages/Policies/Safeguarding";

function App() {
    //const [data, setData] = useState(null);


    const callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    // получение GET маршрута с сервера Express, который соответствует GET из server.js
    useEffect(() => {
        // const cookieUserId =  (document.cookie.match(/user_id=([^;]+)/)[1])
        // if (!cookieUserId){
        // const newUserId = Math.random().toString(36).substring(7);
        // document.cookie = `user_id=${newUserId}`;
        // }
        callBackendAPI()
            // .then(res => setState(res.express))
            .catch(err => console.log(err));
        // fetch("/api")
        //     .then((res) => res.json())
        //     .then((data) => setData(data.message));
        // (async () => {
        //     const response = await fetch("/user", { method: "POST", body: "Home page"});
        //     const responseText = await response.text();
        //     console.log(responseText);
        // })()
    }, []);



    return (
        <div className="wrapper">

            <Routes>
                <Route path="/" element={<App />} />
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/forkids" element={<ForKids />} />
                <Route path="/success" element={<Success />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/annual-reports" element={<AnnualReports />} />
                <Route path="/safeguarding" element={<Safeguarding />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/*<p>{!data ? "Loading..." : data}</p>*/}
        </div>
    )
}

export default App;

const whitelist = [
	"http://localhost:3500",
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"127.0.0.1:5173",
];
const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

export default corsOptions;

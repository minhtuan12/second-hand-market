import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Phương thức không được hỗ trợ" });
    }

    const { accessToken, refreshToken, userProfile } = req.body;
    if (!accessToken || !refreshToken || !userProfile) {
        return res
            .status(400)
            .json({ error: "Thiếu token hoặc thông tin người dùng" });
    }
    
    res.setHeader(
        "Set-Cookie",
        `access_token=${accessToken}; refresh_token=${refreshToken}; user_profile=${userProfile}; HttpOnly; Secure; Path=/;`
    );

    res.send({});
}

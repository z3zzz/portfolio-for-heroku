import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await AwardService.addAward({
      user_id,
      title,
      description,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const awardId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const award = await AwardService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", async function (req, res, next) {
  try {
    // URI로부터 수상 데이터 id를 추출함.
    const awardId = req.params.id;

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const award = await AwardService.setAward({ awardId, toUpdate });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const awardId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardlist/:user_id", async function (req, res, next) {
  try {
    // 특정 사용자의 전체 수상 목록을 얻음
    // @ts-ignore
    const user_id = req.params.user_id;
    const awardList = await AwardService.getAwardList({ user_id });
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };

"use client"

import { FileText, Youtube, ArrowLeft, File, ArrowDownToLine} from "lucide-react"
import BarComponent from "../../../../widgets/client/proccessing/progressBar"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { Button } from "@mui/material"
import { motion } from "framer-motion"
import { Link, useNavigate, useParams } from "react-router"
import { useGetMaterialByIdQuery, useStatusMaterialMutation } from "../../../../entities/materials/model/api"
import { useGetByIdTestQuery, usePostTestSubmitMutation } from "../../../../entities/test/model/api"
import CustomSelector from "../../../../widgets/client/test/customSelector"
import MDEditor from '@uiw/react-md-editor'
import CountdownTimer from '../../../../widgets/client/test/timer'
import toast from 'react-hot-toast'
import { useGetUserProfileQuery } from '../../../../entities/User/model/api'
import { API, API_IMAGE, OtherDocuments } from '../../../../shared/types'


interface Question {
  id: number | string 
  answers: Array<{ id: number; text: string }>
  answerType: "single" | "multiple"
  text: string
}

interface TestData {
  id: number
  title: string
  questions: Question[]
  timeConstraints?: string
}

interface Video {
  videoUrl: string
  coverImg: string
}

interface Answers {
  id: number | string 
  text:string
  image: string
}

interface ApiError {
  data?: {
    message?: string
  }
  status?: number
}


interface Material {
  MaterialUser:{ 
    materialId: number | string
  }
}

// Type guard для проверки ошибки API
function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && ('data' in error || 'status' in error)
}

const CoursePage = () => {
  const params = useParams()
  const { data: materialDataById } = useGetMaterialByIdQuery(params.id)
  
  const { data: userData} = useGetUserProfileQuery([])    
  console.log(userData?.plannedMaterials);
const currentPlannedMaterial = userData?.plannedMaterials?.find(
  (m: Material) => m.MaterialUser?.materialId === Number(params.id) 
);

const status = currentPlannedMaterial?.MaterialUser?.status;


const formatFileName = (name: string) => {
  if (!name) return ''
  const parts = name.split('.')          
  const ext = parts.pop()               
  const baseName = parts.join('.')  
  const shortName = baseName.length > 5 ? baseName.slice(0, 7) + '…' : baseName
  return `${shortName}.${ext}`
}


const downloadFile = async (url: string, filename: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(link.href);
}

  
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)
  const [showTestList, setShowTestList] = useState(true)

  const { data: testData } = useGetByIdTestQuery(selectedTestId, {
    skip: !selectedTestId,
  })

  console.log(testData);
  


  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [answers, setAnswers] = useState<{ questionId: number; selected: number[] }[]>([])
  const [active, setActive] = useState("video")
  const [postTestSubmit, { data: responseTest }] = usePostTestSubmitMutation()
  const navigate = useNavigate()
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [statusMaterial] = useStatusMaterialMutation()

  const parseTimeString = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleAutoFinish = async () => {
    if (!testData?.questions) return;

    const finalAnswers = testData.questions.map((q: Question) => {
      const existing = answers.find(a => a.questionId === q.id);
      return existing || { questionId: q.id, selected: [] };
    });

    toast.error("Время вышло !");

    try {
      await postTestSubmit({ 
        testId: testData?.id, 
        body: { answers: finalAnswers } 
      }).unwrap();
    } catch (error: unknown) {
      console.error("Ошибка при отправке теста:", error);
      
      if (isApiError(error)) {
        toast.error(`Не удалось отправить ответы. ${error.data?.message || 'Ошибка'} сдачи теста`);
      } else {
        toast.error('Не удалось отправить ответы');
      }
    }

    setIsFinished(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  const handleTestSelect = (testId: number) => {
    setSelectedTestId(testId)
    setShowTestList(false)
    setCurrentQuestion(0)
    setIsFinished(false)
    setSelectedOptions([])
    setAnswers([])
  }

  const handleBackToTestList = () => {
    setShowTestList(true)
    setSelectedTestId(null)
    setCurrentQuestion(0)
    setIsFinished(false)
    setSelectedOptions([])
    setAnswers([])
  }

  const q= testData?.questions?.[currentQuestion]

  const handleOptionChange = (indices: number[]) => {
    setSelectedOptions(indices)
  }

  const handleNext = async () => {
    if (!q || selectedOptions.length === 0) return;

    const selectedAnswerIds = selectedOptions.map((i) => q.answers[i].id);

    const updatedAnswers = [...answers, { questionId: q.id, selected: selectedAnswerIds }];

    setAnswers(updatedAnswers);
    setSelectedOptions([]);

    const next = currentQuestion + 1;
    if (next < testData?.questions?.length) {
      setCurrentQuestion(next);
    } else {
      await submitTest(updatedAnswers);
      setIsFinished(true);
    }
  };

  const submitTest = async (finalAnswers: { questionId: number; selected: number[] }[]) => {
    console.log("Ответы к отправке:", finalAnswers)
    try {
      await postTestSubmit({ 
        testId: testData?.id, 
        body: { answers: finalAnswers } 
      }).unwrap()
    } catch (error: unknown) {
      console.error(error);
      
      if (isApiError(error)) {
        toast.error(`Не удалось отправить ответы. ${error.data?.message || 'Ошибка'} сдачи теста`);
      } else {
        toast.error('Не удалось отправить ответы');
      }
    }
  }

  const percentage = responseTest?.score || 0
  const calculatedCorrectAnswers = testData?.questions?.length
    ? Math.round((percentage / 100) * testData.questions.length)
    : 0

  const isPassed = responseTest?.passed   

  const handleSaveResult = async () => {
    try {
      await statusMaterial({
        userId: userData?.id,
        materialId: params.id,
        status: 'completed'
      }).unwrap()
      navigate('/user')
      toast.success("Вы успешно завершили курс")
    } catch (error: unknown) {
      console.error(error);
      
      if (isApiError(error)) {
        toast.error(`Не удалось завершить курс. ${error.data?.message}. Добавьте курс в свой план.`);
      } else {
        toast.error("Не удалось завершить курс. Добавьте курс в свой план.");
      }
    }
  }

  return (
    <>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <section className="w-[77%] m-auto flex items-start justify-between">
          <aside className="w-[30%] flex flex-col gap-[15px]">
            <div className="p-[10px] h-[200px] flex flex-col gap-[20px] border border-gray-300 rounded-[10px]">
              <div className="flex flex-col gap-[10px]">
                <p className="text-[25px] ml-[20px] font-semibold">{materialDataById?.title}</p>
                <Link to={"/user"}>
                  <p className="text-[20px] ml-[20px] text-[#2548C4]">К странице материалов</p>
                </Link>
              </div>
              <BarComponent />
            </div>

            <div className="flex flex-col gap-[15px]">
              {[
                { key: "video", icon: <Youtube />, label: "Видео" },
                { key: "test", icon: <FileText />, label: "Тест" },
                { key: "file", icon: <FileText />, label: "Статья" },
                { key: "present", icon: <File />, label: "Файлы" },
              ].map(({ key, icon, label }) => (
                <div
                  key={key}
                  className="flex transform hover:translate-y-[-10px] hover:shadow-md duration-200 gap-[20px] items-center border border-gray-300 rounded-[10px] px-[30px] py-[15px]"
                  onClick={() => setActive(key)}
                >
                  <div
                    className={`w-[50px] h-[50px] transition-all duration-300 ease-in-out rounded-full border-[3px]  ${
                      active === key ? "border-green-500" : "border-black"
                    }`}
                  ></div>
                  <div>
                    <p className="text-[18px] font-semibold">{materialDataById?.title}</p>
                    <div className="flex gap-[10px] items-center">
                      {icon}
                      <p>{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <aside className="border border-gray-300 mb-[30px] w-[65%] flex flex-col gap-[10px] py-[20px] px-[40px] justify-center">
            {active === "video" && (
              <>
                <p className="text-[#ADABAB] text-[20px]">Видео</p>
                <p className="text-[25px] text-black font-semibold mb-[10px]">{materialDataById?.title}</p>
               <div className="flex flex-col gap-[30px]">
  {materialDataById?.videos == null || materialDataById?.videos?.length === 0 ? (
    <div className=''>
      <p className='text-[18px] font-semibold tracking-[1px] '>У данного курса отсутствуют видео.</p>

    </div>
  ) : (
    materialDataById.videos.map((video: Video, index: number) => {
      const isPlaying = playingId === video.videoUrl;

      return (
        <div key={`${video.videoUrl}-${index}`} className="relative w-full h-[400px] aspect-video">
          {isPlaying ? (
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls
              playing
            />
          ) : (
            <div
              className="w-full h-full bg-black relative cursor-pointer"
              onClick={() => setPlayingId(video.videoUrl)}
            >
              <img
                src={`${API_IMAGE}${video.coverImg}`}
                alt="Обложка"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-70 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4l12 6-12 6V4z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    })
  )}
</div>

                
                <Button
  variant="contained"
  disabled={status === "completed"} // блокировка кнопки
  sx={{
    backgroundColor: status === "completed" ? "#A5A5A5" : "#3EA458", // серый для завершено
    color: "white",
    textTransform: "none",
    fontSize: "18px",
    letterSpacing: "1px",
    margin: "10px 0 0 0",
    width: "100%",
    cursor: status === "completed" ? "not-allowed" : "pointer",
    "&:hover": {
      backgroundColor: status === "completed" ? "#A5A5A5" : "#35a14a", // чуть темнее при hover
    },
    borderRadius: "8px", // скругление
    fontWeight: 600,
    transition: "all 0.3s ease",
  }}
  onClick={handleSaveResult}
>
  {status === "completed" ? "Завершено" : "Завершить"}
</Button>

              </>
            )}

            {active === "test" && (
  <>
    {showTestList && (
      <div style={{ padding: 20 }} className="flex flex-col items-start gap-[20px]">
        <div className="flex flex-col gap-[5px]">
          <p className="text-[#4A4A4A] text-[20px]">Выберите тест</p>
          <h3 className="text-[#CCCCCC] font-semibold uppercase text-[14px]">
            Доступно тестов: {materialDataById?.test?.length || 0}
          </h3>
        </div>

        <div className="w-full flex flex-col gap-[15px]">
          {materialDataById?.test && materialDataById.test.length > 0 ? (
            materialDataById.test.map((test: TestData, index: number) => (
              <div
                key={test.id}
                onClick={() => handleTestSelect(test.id)}
                className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full font-semibold mr-4 bg-green-600 text-white">
                  {index + 1}
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[20px] font-semibold text-gray-800">Тест {index + 1}</p>
                  <p className="text-[16px] text-gray-600">
                    {test.title || `Тест по материалу "${materialDataById?.title}"`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center w-full">
              <span className="text-lg font-medium text-gray-700">
                У данного курса пока нет тестов
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Как только они появятся, вы сможете пройти их здесь
              </span>
            </div>
          )}
        </div>
      </div>
    )}

      {!showTestList && (
  <>
    {isFinished ? (
      <div style={{ padding: 40 }} className="flex flex-col items-center gap-[20px] text-center">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[24px] text-gray-700">Ты завершил тест:</p>
          <p className="text-[28px] font-semibold text-green-600">
            "{testData?.title || "Тест по расчету заработной платы"}"
          </p>
        </div>

        <div className="flex flex-col gap-[15px] items-center">
          <p className="text-[20px] text-gray-600">Твой результат</p>
          <p className="text-[80px] font-bold text-green-500">{percentage}%</p>
          <p className={`text-[24px] font-semibold ${isPassed ? "text-green-500" : "text-red-500"}`}>
            {isPassed ? "Тест пройден" : "Тест не пройден"}
          </p>
          <p className="text-[18px] text-gray-500">
            Правильных ответов: {calculatedCorrectAnswers} из {testData?.questions?.length}.
          </p>
        </div>

        <button
          onClick={handleBackToTestList}
          className="mt-[20px] px-[40px] py-[12px] bg-green-500 hover:bg-green-600 text-white font-semibold text-[18px] rounded-[8px] transition-colors duration-200"
        >
          Далее
        </button>
      </div>
    ) : (
      <div style={{ padding: 20 }} className="flex flex-col items-start gap-[20px]">
        <button
          onClick={handleBackToTestList}
          className="flex items-center gap-[10px] text-[#2548C4] hover:text-[#1a3a9e] transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span className="text-[18px]">Назад к выбору тестов</span>
        </button>

        <div className='flex justify-between w-[100%] items-start'>
          <div className="flex flex-col gap-[5px]">
            <p className="text-[#4A4A4A] text-[20px]">
              {testData?.title || "Тест по расчету заработной платы"}
            </p>
            <h3 className="text-[#CCCCCC] font-semibold uppercase text-[14px]">
              Вопрос {currentQuestion + 1} из {testData?.questions?.length}
            </h3>
          </div>
          <div>
            {testData && testData.timeConstraints && (
              <CountdownTimer
                initialTime={parseTimeString(testData.timeConstraints)}
                onFinish={handleAutoFinish} 
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[5px]">
          <p className="text-[25px] font-semibold">{q?.text || "Вопрос"}</p>

          {/* Картинка вопроса */}
          {q?.image && typeof q.image === "string" && q.image.trim() !== "" && (
            <img
              src={`https://lms.avesto.tj/api${q.image}`}
              alt="Изображение вопроса"
              className="mt-2 mb-2 max-w-full h-auto rounded-md border border-gray-300"
            />
          )}

          <p className="text-[#A5A5A5] text-[20px]">
            {q?.answerType === "multiple"
              ? "Можно выбрать несколько вариантов ответа"
              : "Можно выбрать только один вариант ответа"}
          </p>
        </div>

        <div className="w-full">
          <CustomSelector
            options={
              q?.answers?.map((answer: Answers) => ({
                id: answer.id.toString(),
                label: (
                  <div className="flex flex-col gap-1">
                    <span>{answer.text}</span>
                    {/* Картинка ответа */}
                    {answer.image && typeof answer.image === "string" && answer.image.trim() !== "" && (
                      <img
                        src={`https://lms.avesto.tj/api${answer.image}`}
                        alt="Изображение ответа"
                        className="w-full max-w-[200px] h-auto object-cover rounded-md border border-gray-200 mt-1"
                      />
                    )}
                  </div>
                ),
                value: answer.text,
              })) || []
            }
            mode={q?.answerType === "multiple" ? "multiple" : "single"}
            selectedIndices={selectedOptions}
            onChange={handleOptionChange}
          />
        </div>

        <div className="w-full flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
            style={{
              marginTop: 20,
              padding: "10px 24px",
              width: "200px",
              backgroundColor: selectedOptions.length === 0 ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: selectedOptions.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            {currentQuestion === testData?.questions?.length - 1 ? "Завершить" : "Следующий"}
          </button>
        </div>
      </div>
    )}
  </>
)}



  </>
)}


            {active === "file" && (
  <>
    <div className="">
      {materialDataById?.article ? (
        <MDEditor.Markdown
          source={materialDataById.article}
          style={{ borderRadius: "6px", padding: "10px" }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center w-full">
          <span className="text-lg font-medium text-gray-700">
            У данного курса нет статьи
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Как только она появится, вы сможете прочитать её здесь
          </span>
        </div>
      )}
    </div>
  </>
)}

   {active === "present" && (
  <div className="space-y-4">
    {/* Блок Файлы */}
    <div>
      <p className="font-semibold mb-2">Файлы:</p>
      {materialDataById?.files && materialDataById.files.length > 0 ? (
        <div className="grid gap-3">
          {materialDataById.files.map((item: OtherDocuments) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 border rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 transition"
              onClick={() =>
                downloadFile(`${API}/${item.url}`, item.originalName)
              }
            >
              <ArrowDownToLine className="text-blue-600" />
              <p className="text-sm font-medium">
                {formatFileName(item.originalName)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center w-full">
          <span className="text-lg font-medium text-gray-700">
            У данного курса нет файлов
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Как только она появится, вы сможете скачать её здесь
          </span>
        </div>
      )}
    </div>

    {/* Блок Презентации */}
    <div>
      <p className="font-semibold mb-2">Презентации:</p>
      {materialDataById?.presents && materialDataById.presents.length > 0 ? (
        <div className="grid gap-3">
          {materialDataById.presents.map((item: OtherDocuments) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 border rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 transition"
              onClick={() =>
                downloadFile(`${API}/${item.url}`, item.originalName)
              }
            >
              <ArrowDownToLine className="text-green-600" />
              <p className="text-sm font-medium">
                {formatFileName(item.originalName)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center w-full">
          <span className="text-lg font-medium text-gray-700">
            У данного курса нет презентаций
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Как только она появится, вы сможете скачать её здесь
          </span>
        </div>
      )}
    </div>
  </div>
)}




          </aside>
        </section>
      </motion.div>
    </>
  )
}

export default CoursePage

          
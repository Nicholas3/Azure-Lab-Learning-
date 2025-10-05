import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Play, Video } from "lucide-react";
import { useState } from "react";
import { LessonDTO } from "@/lib/interfaces/dtos/response/lesson-dto";
import { useMarkLessonAsDone } from "@/hooks/api/lesson/mutations/use-mark-lesson-as-done";

interface LessonsSectionProps {
  lessons: LessonDTO[];
  courseId: string;
}

export function LessonsSection({ lessons }: LessonsSectionProps) {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const markAsDoneMutation = useMarkLessonAsDone();

  const activeLesson = activeLessonId
    ? lessons.find((l) => l.id === activeLessonId)
    : null;

  const handleMarkComplete = async (lessonId: number) => {
    markAsDoneMutation.mutate({ lessonId });
  };

  const handlePlayVideo = () => {
    setIsVideoVisible(true);
  };

  const handleSelectLesson = (lesson: LessonDTO) => {
    setActiveLessonId(lesson.id);
    setIsVideoVisible(false);
  };

  const handleGoBack = () => {
    setActiveLessonId(null);
    setIsVideoVisible(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Course Content</h2>
      {activeLesson ? (
        <div className="space-y-4">
          <Button variant="outline" onClick={handleGoBack} className="mb-2">
            Back to lessons
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>{activeLesson.title}</CardTitle>
              <CardDescription>
                {activeLesson.completed ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" /> Completed
                  </span>
                ) : (
                  "Not completed"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                {isVideoVisible && activeLesson.contentUrl ? (
                  <div className="w-full h-full">
                    <iframe
                      src={activeLesson.contentUrl}
                      title={activeLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2">Video content would load here</p>
                      <Button className="mt-4" onClick={handlePlayVideo}>
                        <Play className="h-4 w-4 mr-2" /> Play Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {activeLesson.description}
                </p>
              </div>
              <div className="pt-2">
                {activeLesson.completed ? (
                  <Button
                    disabled
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Done
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleMarkComplete(activeLesson.id)}
                    disabled={markAsDoneMutation.isPending}
                    className="w-full sm:w-auto"
                  >
                    Mark As Completed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSelectLesson(lesson)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Video className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {lesson.completed ? (
                  <div className="flex items-center text-green-600 font-medium text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Done
                  </div>
                ) : (
                  <Button size="sm" variant="ghost">
                    Start
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

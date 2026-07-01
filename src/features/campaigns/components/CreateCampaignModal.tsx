import { useNavigate } from "react-router";
import { useCreateCampaign } from "../hooks/useCreateCampaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type CreateCampaignDTO,
  CreateCampaignSchema,
} from "../../../schemas/campaign.schema";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/ui/Button";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "../../../components/ui/Modal";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const navigate = useNavigate();
  const { createCampaign, isPending } = useCreateCampaign();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<CreateCampaignDTO, "title">>({
    resolver: zodResolver(CreateCampaignSchema.pick({ title: true })),
    defaultValues: {
      title: "",
    },
  });

  function handleClose() {
    reset();
    onClose();
  }

  function onSubmit(data: Pick<CreateCampaignDTO, "title">) {
    createCampaign(data, {
      onSuccess: (response) => {
        handleClose();
        navigate(`/campaigns/${response.data.id}/`);
      },
      onError: (error) => {
        // CHANGE to UI (toast or something)
        console.error("Помилка при створенні кампанії:", error);
      },
    });
  }

  return (
    <ModalRoot open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <ModalContent size="default" variant="default">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <ModalTitle>Новий кампейн</ModalTitle>
            <ModalDescription>Введіть назву кампейну</ModalDescription>
          </ModalHeader>

          {/* Контент форми (OSR Input) */}
          <div className="py-2">
            <FormInput
              autoFocus
              placeholder="Прокляття Страда"
              {...register("title")}
              error={errors.title?.message}
              disabled={isPending}
            />
          </div>

          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              Відмінити
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Створення..." : "Створити"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalRoot>
  );
}

export default CreateCampaignModal;

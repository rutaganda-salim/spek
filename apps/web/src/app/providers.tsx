"use client";

import ReactModal from "react-modal";
import { TooltipProvider, Toaster } from "@spek/ui";
import { QueryClientProvider } from "react-query";

import { ConfirmModal } from "@/components/ConfirmModal";
import { DataFetchingContextProvider } from "@/contexts/DataFetchingContext";
import { queryClient } from "@/utils/queryClient";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { MainWsHandlerProvider } from "@/hooks/useMainWsHandler";
import { WebRTC } from "@/webrtc/WebRTC";
import { UserPreviewContextProvider } from "@/contexts/UserPreviewContext";

interface Props {
  children?: React.ReactNode;
}

ReactModal.setAppElement("body");

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <DataFetchingContextProvider>
          <MainWsHandlerProvider>
            <TooltipProvider>
              <UserPreviewContextProvider>
                {children}
                <ConfirmModal />
                <Toaster />
                <WebRTC />
              </UserPreviewContextProvider>
            </TooltipProvider>
          </MainWsHandlerProvider>
        </DataFetchingContextProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
};

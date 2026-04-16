import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCornerMenu } from "../../../components/UserCornerMenu";
import { WelcomePopover } from "../../../components/WelcomePopover";
import { logoutRequest } from "../../../api/authApi";
import { githubModelsTestRequest } from "../../../api/githubModelsApi";
import { paths } from "../../../app/paths";
import { useAppDispatch } from "../../../store/hooks";
import { clearUser } from "../../../store/userSlice";
import * as SC from "./HomePage.styles";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async (useCustomPrompt: boolean) => {
    setError(null);
    setReply(null);
    setModel(null);
    setLoading(true);
    try {
      const body =
        useCustomPrompt && prompt.trim()
          ? { prompt: prompt.trim() }
          : undefined;
      const data = await githubModelsTestRequest(body);
      setModel(data.model);
      setReply(data.reply?.trim() || "(empty reply)");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      /* кука могла уже истечь — всё равно уходим на вход */
    }
    dispatch(clearUser());
    navigate(paths.auth, { replace: true });
  };

  return (
    <SC.Page>
      <UserCornerMenu onLogout={logout} disabled={loading} />
      <WelcomePopover />
      <SC.Layout>
        <SC.Header>
          <SC.Title>Home</SC.Title>
          <SC.Subtitle>
            Test request to GitHub Models via the BFF (model and token stay on the
            server).
          </SC.Subtitle>
        </SC.Header>

        <SC.Card>
          <SC.Field>
            <SC.Label htmlFor="gm-prompt">
              Prompt (optional; empty uses the default greeting)
            </SC.Label>
            <SC.PromptInput
              id="gm-prompt"
              as="textarea"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., explain what a REST API is in one sentence"
              disabled={loading}
            />
          </SC.Field>

          <SC.Actions>
            <SC.ActionButton
              type="button"
              disabled={loading}
              onClick={() => runTest(false)}
            >
              {loading ? "Request…" : "Default prompt"}
            </SC.ActionButton>
            <SC.ActionButton
              type="button"
              disabled={loading || !prompt.trim()}
              onClick={() => runTest(true)}
            >
              Send my text
            </SC.ActionButton>
          </SC.Actions>

          {model && <SC.ModelTag>Model: {model}</SC.ModelTag>}
          {reply && <SC.ReplyBox role="status">{reply}</SC.ReplyBox>}
          {error && (
            <SC.ErrorBox role="alert">{error}</SC.ErrorBox>
          )}
        </SC.Card>
      </SC.Layout>
    </SC.Page>
  );
};

import {
  Button,
  CameraPreview,
  Card,
  FileUploader,
  Input,
  Loader
} from "@banking-mf/ui-library";
import { StatusPill } from "./StatusPill.jsx";

export function PersonalStep({
  personal,
  documents,
  errors,
  onPersonalChange,
  onFileSelect,
  onCapture,
  onContinue
}) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
          Step 1
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Personal information</h2>
        <p className="mt-2 text-sm text-slate-500">
          Collect identity details, upload NID documents, and complete dummy face liveness.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={personal.fullName}
          error={errors.fullName}
          onChange={(event) => onPersonalChange({ fullName: event.target.value })}
        />
        <Input
          label="Date of Birth"
          type="date"
          max="2008-03-31"
          value={personal.dateOfBirth}
          error={errors.dateOfBirth}
          onChange={(event) => onPersonalChange({ dateOfBirth: event.target.value })}
        />
        <Input
          label="Phone"
          placeholder="Enter phone number"
          value={personal.phone}
          error={errors.phone}
          onChange={(event) => onPersonalChange({ phone: event.target.value })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          value={personal.email}
          error={errors.email}
          onChange={(event) => onPersonalChange({ email: event.target.value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <FileUploader
            label="NID Upload (Front)"
            helperText="Upload the front side of the national ID."
            accept="image/*,.pdf"
            file={documents.nidFront}
            onFileSelect={(file) => onFileSelect("nidFront", file)}
          />
          {errors.nidFront ? <p className="text-sm text-red-500">{errors.nidFront}</p> : null}
        </div>
        <div className="space-y-2">
          <FileUploader
            label="NID Upload (Back)"
            helperText="Upload the back side of the national ID."
            accept="image/*,.pdf"
            file={documents.nidBack}
            onFileSelect={(file) => onFileSelect("nidBack", file)}
          />
          {errors.nidBack ? <p className="text-sm text-red-500">{errors.nidBack}</p> : null}
        </div>
      </div>

      <div className="space-y-4">
        <CameraPreview capturedImage={documents.faceImage} onCapture={onCapture} />

        <div className="flex flex-wrap items-center gap-4 rounded-xl bg-gray-100 p-4 shadow">
          <span className="text-sm font-semibold text-slate-700">Verification status:</span>
          {documents.livenessStatus === "verified" ? (
            <StatusPill label="Verified" tone="success" />
          ) : documents.livenessStatus === "verifying" ? (
            <>
              <StatusPill label="Verifying" tone="warning" />
              <Loader label="Simulating liveness check..." />
            </>
          ) : (
            <StatusPill label="Not started" tone="neutral" />
          )}
        </div>

        {errors.livenessStatus ? (
          <p className="text-sm text-red-500">{errors.livenessStatus}</p>
        ) : null}
      </div>

      <div className="flex justify-end">
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </Card>
  );
}

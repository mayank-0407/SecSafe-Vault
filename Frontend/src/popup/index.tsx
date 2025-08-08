import { useState, useContext, useEffect } from "react";
import { PasswordVaultContext } from "../Utils/context/PasswordVaultContext";
import { decryptText } from "../Utils/Helpers/encryption";
import { Dialog } from "@headlessui/react";

const VaultDashboard = () => {
  const context = useContext(PasswordVaultContext);

  if (!context) return <div>Loading context...</div>;
  const { entries, addEntry, deleteEntry, formData, handleChange, isLoading } =
    context;

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showSecrets, setShowSecrets] = useState(false);

  const [isMetaMaskMissing, setIsMetaMaskMissing] = useState(false);

  const openViewModal = (entry: any) => {
    setSelectedEntry(entry);
    setShowSecrets(false);
    setViewModalOpen(true);
  };

  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window?.ethereum === "undefined") {
        setIsMetaMaskMissing(true);
      } else {
        setIsMetaMaskMissing(false);
      }
    };

    checkMetaMask();

    // Re-check on tab focus
    window.addEventListener("focus", checkMetaMask);

    return () => {
      window.removeEventListener("focus", checkMetaMask);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          🔐 SecSafe Password Vault
        </h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-blue-700 transition"
        >
          + Add New Password
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-gray-600">
          No entries yet. Click “Add New Passowrd to start.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry: any, index: number) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="overflow-hidden">
                <h3
                  className="text-xl font-semibold text-gray-800 truncate"
                  title={entry.name}
                >
                  {entry.name}
                </h3>
                <p
                  className="text-sm text-gray-500 truncate"
                  title={entry.username}
                >
                  {decryptText(entry.username)}
                </p>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => openViewModal(entry)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => deleteEntry(index)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-2xl font-bold mb-4 text-gray-800">
              🔍 {selectedEntry?.name}
            </Dialog.Title>
            <div className="space-y-3 text-gray-700 text-sm">
              <div>
                <span className="font-medium">Username:</span>{" "}
                {showSecrets
                  ? decryptText(selectedEntry?.username)
                  : "••••••••"}
              </div>
              <div>
                <span className="font-medium">Password:</span>{" "}
                {showSecrets
                  ? decryptText(selectedEntry?.password)
                  : "••••••••"}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowSecrets(!showSecrets)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                {showSecrets ? "Hide" : "Unhide"}
              </button>
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add Modal */}
      <Dialog
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-2xl font-bold mb-4 text-gray-800">
              ➕ Add New Password
            </Dialog.Title>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await addEntry();
                setAddModalOpen(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Site Name"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleChange(e, "username")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e, "password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {isLoading ? "Adding..." : "Add Entry"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* MetaMask Missing Modal */}
      <Dialog
        open={isMetaMaskMissing}
        onClose={() => {}}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center z-50">
            <Dialog.Title className="text-xl font-semibold text-red-600 mb-3">
              MetaMask Not Found
            </Dialog.Title>
            <p className="text-gray-700 mb-4">
              To use this vault, you need to install MetaMask.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Install MetaMask
            </a>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default VaultDashboard;

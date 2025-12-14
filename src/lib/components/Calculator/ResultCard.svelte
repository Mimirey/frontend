<script>
    export let result; // Menerima objek hasil dari komponen induk
    // Fungsi pembantu untuk membulatkan angka
    const round = (num) => Math.round(num * 10) / 10;
</script>

<div class="alert shadow-lg bg-base-200">
    <div>
        <h4 class="font-bold text-lg text-primary">{result.substituteName}</h4>
        <p class="text-sm">
            Anda membutuhkan **{round(result.requiredAmount)} gram** {result.substituteName}
            untuk menggantikan {result.originalAmount} gram {result.original}.
        </p>
        <p class="text-xs italic mt-1 text-info">Catatan: {result.notes}</p>
    </div>
</div>

<div class="overflow-x-auto mt-2">
    <table class="table table-zebra w-full text-sm">
        <thead>
            <tr>
                <th>Kandungan Gizi Estimasi</th>
                <th>{result.original} ({result.originalAmount}g)</th>
                <th>{result.substituteName} ({round(result.requiredAmount)}g)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Karbohidrat (g)</td>
                <td>{round(result.originalNutrition.carbs * result.originalAmount / 100)}</td>
                <td>{round(result.newNutrition.carbs)}</td>
            </tr>
            <tr>
                <td>Protein (g)</td>
                <td>{round(result.originalNutrition.protein * result.originalAmount / 100)}</td>
                <td>{round(result.newNutrition.protein)}</td>
            </tr>
            <tr>
                <td>Serat (g)</td>
                <td>{round(result.originalNutrition.fiber * result.originalAmount / 100)}</td>
                <td>{round(result.newNutrition.fiber)}</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="divider"></div>